import { makeQuery } from "./clickhouse/makeQuery.js";
import { APIErrorResponse } from "./utils.js";

import type { Context } from "hono";
import type { AdditionalQueryParams, UsageEndpoints, UsageResponse, ValidUserParams } from "./types/api.js";

/**
 * This function creates and send the SQL queries to the ClickHouse database based on the endpoint requested.
 * 
 * Both the REST API and GraphQL endpoint use those.
 * `endpoint` is a valid "Usage" endpoint (e.g. not a `/version`, `/metrics`, etc. endpoint, an actual data endpoint).
 * `user_params` is an key-value object created from the path and query parameters present in the request.
 **/

export async function makeUsageQuery(ctx: Context, endpoint: UsageEndpoints, user_params: ValidUserParams<typeof endpoint>) {
    type UsageElementReturnType = UsageResponse<typeof endpoint>[number];

    let { page, ...query_params } = user_params;

    if (!query_params.limit)
        query_params.limit = 10;

    if (!page)
        page = 1;

    let filters = "";
    // Don't add `limit` and `block_range` to WHERE clause
    for (let k of Object.keys(query_params).filter(k => k !== "limit")) {
        const clickhouse_type = typeof query_params[k as keyof typeof query_params] === "number" ? "int" : "String";

        // TODO: Improve/remove filtering by modifying the underlying schemas
        if (!endpoint.startsWith('/blocks') && ['date', 'hash', 'number'].includes(k) && !(endpoint == '/transactions/hash/{hash}' && k == 'hash'))
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
    let additional_query_params: AdditionalQueryParams = {};

    if (endpoint == "/blocks/date/{date}" || endpoint == "/blocks/hash/{hash}" || endpoint == "/blocks/number/{number}") {
        query += `SELECT * FROM blocks ${filters} ORDER BY number`;
    } else if (endpoint == "/actions/account/{account}" || endpoint == "/actions/name/{name}" || endpoint == "/actions/date/{date}") {
        query += `SELECT * FROM actions ${filters} ORDER BY block_number`;
    } else if (endpoint == "/dbops/date/{date}" || endpoint == "/dbops/pk/{pk}" || endpoint == "/dbops/scope/{scope}") {
        query += `SELECT * FROM db_ops ${filters} ORDER BY block_number`;
    } else if (endpoint == "/transactions/date/{date}" || endpoint == "/transactions/hash/{hash}") {
        query += `SELECT * FROM transactions ${filters} ORDER BY block_number`;
    } else {
        return APIErrorResponse(ctx, 400, "bad_query_input", `Unknown endpoint: ${endpoint}`);
    }

    query += " LIMIT {limit: int}";
    query += " OFFSET {offset: int}";

    let query_results;
    additional_query_params.offset = query_params.limit * (page - 1);
    try {
        query_results = await makeQuery<UsageElementReturnType>(query, { ...query_params, ...additional_query_params });
    } catch (err) {
        return APIErrorResponse(ctx, 500, "bad_database_response", err);
    }

    // Always have a least one total page
    const total_pages = Math.max(Math.ceil((query_results.rows_before_limit_at_least ?? 0) / query_params.limit), 1);

    if (page > total_pages)
        return APIErrorResponse(ctx, 400, "bad_query_input", `Requested page (${page}) exceeds total pages (${total_pages})`);

    /* Solving the `data` type issue:
    type A = string[] | number[]; // This is union of array types
    type B = A[number][]; // This is array of elements of union type

    let t: A;
    let v: B;

    t = v; // Error
    */

    return ctx.json<UsageResponse<typeof endpoint>, 200>({
        // @ts-ignore        
        data: query_results.data,
        meta: {
            statistics: query_results.statistics ?? null,
            next_page: (page * query_params.limit >= (query_results.rows_before_limit_at_least ?? 0)) ? page : page + 1,
            previous_page: (page <= 1) ? page : page - 1,
            total_pages,
            total_results: query_results.rows_before_limit_at_least ?? 0
        }
    });
}

