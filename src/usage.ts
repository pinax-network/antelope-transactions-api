import { makeQuery } from "./clickhouse/makeQuery.js";
import { APIErrorResponse } from "./utils.js";

import type { Context } from "hono";
import type { AdditionalQueryParams, EndpointReturnTypes, UsageEndpoints, UsageResponse, ValidUserParams } from "./types/api.js";
import { ModelsActionsSchema, ModelsAuthorizationsSchema, ModelsReceiversSchema, ModelsTransactionsSchema } from "./types/zod.gen.js";

/**
 * This function creates and send the SQL queries to the ClickHouse database based on the endpoint requested.
 * 
 * Both the REST API and GraphQL endpoint use those.
 * `endpoint` is a valid "Usage" endpoint (e.g. not a `/version`, `/metrics`, etc. endpoint, an actual data endpoint).
 * `user_params` is an key-value object created from the path and query parameters present in the request.
 **/

export async function makeUsageQuery(ctx: Context, endpoint: UsageEndpoints, user_params: ValidUserParams<typeof endpoint>) {
    type UsageElementReturnType = UsageResponse<typeof endpoint>[number];

    let { first, skip, order_by, order_direction, ...query_params } = user_params;

    if (!first)
        first = 10;
    if (!skip)
        skip = 0;
    if (!order_by)
        order_by = 'block_number';
    if (!order_direction)
        order_direction = 'desc';

    let filters = "";
    for (let k of Object.keys(query_params)) {
        const clickhouse_type = typeof query_params[k as keyof typeof query_params] === "number" ? "int" : "String";

        if (k === 'hash' && (endpoint == "/authorizations/transaction/{hash}" || endpoint == "/receivers/transaction/{hash}"))
            // Rename `hash` parameter to `tx_hash` for transactions endpoint
            filters += ` (tx_${k} = {${k}: ${clickhouse_type}}) AND`;
        else if (k === 'ordinal')
            filters += ` (action_${k} = {${k}: ${clickhouse_type}}) AND`;
        else if (['date', 'number'].includes(k))
            // Add `block_` suffix for all endpoints for search by date and number
            filters += ` (block_${k} = {${k}: ${clickhouse_type}}) AND`;
        else if (k === 'pk')
            filters += ` (primary_key = {${k}: ${clickhouse_type}}) AND`;
        else
            filters += ` (${k} = {${k}: ${clickhouse_type}}) AND`;
    }

    filters = filters.substring(0, filters.lastIndexOf(' ')); // Remove last item ` AND`
    if (filters.length)
        filters = `WHERE ${filters}`;

    let query = "";
    let additional_query_params: AdditionalQueryParams = {
        limit: first,
        offset: skip,
        order_by
    };

    if (endpoint == "/blocks/date/{date}" || endpoint == "/blocks/hash/{hash}" || endpoint == "/blocks/number/{number}") {
        query += `SELECT * FROM blocks ${filters}`;
    } else if (endpoint == "/actions/account/{account}" || endpoint == "/actions/name/{name}" || endpoint == "/actions/date/{date}") {
        query += `SELECT * FROM actions ${filters}`;
    } else if (endpoint == "/transactions/date/{date}" || endpoint == "/transactions/hash/{hash}") {
        query += `SELECT * FROM transactions ${filters}`;
    } else if (endpoint.startsWith("/authorizations")) {
        query += `SELECT * FROM authorizations ${filters}`;
    } else if (endpoint.startsWith("/receivers")) {
        query += `SELECT * FROM receivers ${filters}`;
    } else if (endpoint == "/search/transactions") {
        const searchResponse: EndpointReturnTypes<typeof endpoint> = {
            data: [],
            meta: {
                statistics: {
                    bytes_read: 0,
                    elapsed: 0,
                    rows_read: 0,
                },
                total_results: 0
            }
        };

        const q = query_params as ValidUserParams<typeof endpoint>;
        if (!q.account && !q.action && !q.auth && !q.hash && !q.number && !q.receiver)
            return APIErrorResponse(ctx, 400, "bad_query_input", "Too few parameters !");

        filters = '';
        if (q.hash || q.number)
            filters += `WHERE 1=1 ${q.hash ? 'AND hash={hash: String} ' : ''} ${q.number ? 'AND block_number={number: int} ' : ''}`;

        // Fetch transactions matching hash/number filters if present, use first, skip and order_* inputs here as well 
        const transactions = (await makeQuery(
            `SELECT * FROM transactions ORDER BY {order_by: String} ${order_direction} LIMIT {limit: int} OFFSET {offset:int}`,
            { limit: first, offset: skip, order_by, order_direction, hash: q.hash ?? '', number: q.number })
        );

        // For each transactions, we match the tx_hash to get the Actions, Authorizations and Receivers
        for (const t of (transactions.data as Iterable<ModelsTransactionsSchema>)) {
            const tx_hash = t.hash;

            // TODO: Add max actions limit ?
            const actions = (await makeQuery<ModelsActionsSchema>(
                `SELECT * FROM actions WHERE tx_hash={hash: String} `
                + `${q.account ? 'AND account={account: String} ' : ''} `
                + `${q.action ? 'AND name={name: String} ' : ''}`,
                { account: q.account, hash: tx_hash, name: q.action }
            ));

            // TODO: Add max authorizations limit ?
            const authorizations = (await makeQuery<ModelsAuthorizationsSchema>(
                `SELECT tx_hash, action_ordinal, actor, permission FROM authorizations WHERE tx_hash={hash: String} `
                + `${q.auth ? 'AND actor={actor: String} ' : ''}`,
                { actor: q.auth, hash: tx_hash }
            ));

            // TODO: Add max receivers limit ?
            const receivers = (await makeQuery<ModelsReceiversSchema>(
                `SELECT tx_hash, action_ordinal, receiver FROM receivers WHERE tx_hash={hash: String} `
                + `${q.receiver ? 'AND receiver={receiver: String} ' : ''}`,
                { hash: tx_hash, receiver: q.receiver }
            ));

            searchResponse.data.push({
                ...t,
                actions: actions.data,
                authorizations: authorizations.data,
                receivers: receivers.data,
            });

            // Update statistics from all query responses (cumulative sum)
            [actions, authorizations, receivers]
                // @ts-ignore Suppress `statistics` type having `| null`. ClickHouse always returns statistics.
                .forEach(e => Object.keys(searchResponse.meta.statistics).map((k) => {
                    // @ts-ignore
                    searchResponse.meta.statistics[k] += e.statistics[k];
                }));
        }

        searchResponse.meta.total_results = transactions.data.length;
        return ctx.json(searchResponse);
    } else {
        return APIErrorResponse(ctx, 400, "bad_query_input", `Unknown endpoint: ${endpoint}`);
    }

    query += ` ORDER BY {order_by: String} ${order_direction}`;
    query += " LIMIT {limit: int}";
    query += " OFFSET {offset: int}";

    let query_results;
    try {
        query_results = await makeQuery<UsageElementReturnType>(query, { ...query_params, ...additional_query_params });
    } catch (err) {
        return APIErrorResponse(ctx, 500, "bad_database_response", err);
    }

    return ctx.json<UsageResponse<typeof endpoint>, 200>({
        // @ts-ignore Suppress TS weird type confusion between union of array types and array of union types
        data: query_results.data,
        meta: {
            statistics: query_results.statistics ?? null,
            total_results: query_results.rows_before_limit_at_least ?? 0
        }
    });
}

