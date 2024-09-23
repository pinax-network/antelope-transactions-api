import { makeQuery } from "./clickhouse/makeQuery.js";
import { APIErrorResponse } from "./utils.js";

import type { Context } from "hono";
import type { UsageEndpoints, UsageResponse } from "./types/api.js";

/**
 * This function creates and send the SQL queries to the ClickHouse database based on the endpoint requested.
 *
 * Both the REST API and GraphQL endpoint use those.
 * `endpoint` is a valid "Usage" endpoint (e.g. not a `/version`, `/metrics`, etc. endpoint, an actual data endpoint).
 * `user_params` is an key-value object created from the path and query parameters present in the request.
 **/

export async function makeUsageQuery(ctx: Context, endpoint: UsageEndpoints, user_params: any) {
    type UsageElementReturnType = UsageResponse<typeof endpoint>[number];

    let { ...query_params } = user_params;

    // SELECT
    const table_name = endpoint.split("/")[1];
    let query = [`SELECT * FROM ${table_name}`];

    // WHERE
    let where = [];
    for (let key in query_params) {
        if (["limit", "offset", "order_by", "order_direction", "skip", "first"].includes(key)) continue; // skip pagination params
        const value = (query_params as any)[key];
        let isNumber = !isNaN(Number(value));
        // where.push(`${key} = {${key}: ${isNumber ? "int" : "String"}}`);
        where.push(`${key}='${value}'`);
    }
    if (where.length) query.push(`WHERE ${where.join(" AND ")}`);

    // ORDER BY
    const ORDER_BY = new Set(["block_number", "block_number,index", "action_index", "action_index,index", "index"]);
    let order_direction = query_params.order_direction?.toLowerCase() === "desc" ? "DESC" : "ASC";
    if (ORDER_BY.has(query_params.order_by)) query.push(`ORDER BY ${query_params.order_by} ${order_direction}`);

    // LIMIT and OFFSET
    if (query_params.first) query_params.limit = query_params.first; // rename first => limit
    if (query_params.limit == undefined) query_params.limit = 20;
    if (query_params.limit >= 500) query_params.limit = 500;
    if (query_params.skip) query_params.offset = query_params.skip; // rename skip => offset
    if (query_params.limit) query.push("LIMIT {limit: int}");
    if (query_params.offset) query.push("OFFSET {offset: int}");

    try {
        const result = await makeQuery<UsageElementReturnType>(query.join(" "), { ...query_params });
        // Remove the `meta` key from the response
        if (result.meta) delete result.meta;
        return ctx.json(result);
    } catch (err) {
        return APIErrorResponse(ctx, 500, "bad_database_response", err);
    }
}