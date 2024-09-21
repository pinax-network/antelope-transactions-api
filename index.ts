import { Hono, type Context } from "hono";
import { z } from 'zod';

import client from './src/clickhouse/client.js';
import openapi from "./static/@typespec/openapi3/openapi.json";
import * as prometheus from './src/prometheus.js';
import { APP_VERSION } from "./src/config.js";
import { logger } from './src/logger.js';
import { makeUsageQuery } from "./src/usage.js";
import { APIErrorResponse } from "./src/utils.js";
import { usageOperationsToEndpointsMap, type EndpointReturnTypes, type UsageEndpoints } from "./src/types/api.js";
import { paths } from './src/types/zod.gen.js';

async function AntelopeTransactionsAPI() {
    const app = new Hono();

    // Tracking all incoming requests
    app.use(async (ctx: Context, next) => {
        const pathname = ctx.req.path;
        logger.trace(`Incoming request: [${pathname}]`);
        prometheus.request.inc({ pathname });

        await next();
    });

    // ---------------
    // --- Swagger ---
    // ---------------

    app.get(
        "/",
        async (_) => new Response(Bun.file("./swagger/index.html"))
    );

    app.get(
        "/favicon.ico",
        async (_) => new Response(Bun.file("./swagger/favicon.ico"))
    );

    // ------------
    // --- Docs ---
    // ------------

    app.get(
        "/openapi",
        async (ctx: Context) => ctx.json<{ [key: string]: EndpointReturnTypes<"/openapi">; }, 200>(openapi)
    );

    app.get(
        "/version",
        async (ctx: Context) => ctx.json<EndpointReturnTypes<"/version">, 200>(APP_VERSION)
    );

    // ------------------
    // --- Monitoring ---
    // ------------------

    app.get(
        "/health",
        async (ctx: Context) => {
            const response = await client.ping();

            if (!response.success) {
                return APIErrorResponse(ctx, 500, "bad_database_response", response.error.message);
            }

            return new Response("OK");
        }
    );

    app.get(
        "/metrics",
        async () => new Response(await prometheus.registry.metrics())
    );

    // --------------------------
    // --- REST API endpoints ---
    // --------------------------

    const createUsageEndpoint = (endpoint: UsageEndpoints) => app.get(
        // Hono using different syntax than OpenAPI for path parameters
        // `/{path_param}` (OpenAPI) VS `/:path_param` (Hono)
        endpoint.replace(/{([^}]+)}/g, ":$1"),
        async (ctx: Context) => {
            // Use `unknown` for undefined schemas definitions in `zod.gen.ts`
            const path_params_schema = paths[endpoint]["get"]["parameters"]["path"] ?? z.unknown();
            const query_params_schema = paths[endpoint]["get"]["parameters"]["query"] ?? z.unknown();
            const path_params = path_params_schema.safeParse(ctx.req.param());
            const query_params = query_params_schema.safeParse(ctx.req.query());

            if (path_params.success && query_params.success) {
                return makeUsageQuery(
                    ctx,
                    endpoint,
                    {
                        ...path_params.data as any,
                        ...query_params.data as any
                    }
                );
            } else {
                return APIErrorResponse(ctx, 400, "bad_query_input", { ...path_params.error, ...query_params.error });
            }
        }
    );

    // Create all API endpoints interacting with DB
    Object.values(usageOperationsToEndpointsMap).forEach(e => createUsageEndpoint(e));

    // -------------
    // --- Miscs ---
    // -------------

    app.notFound((ctx: Context) => APIErrorResponse(ctx, 404, "route_not_found", `Path not found: ${ctx.req.method} ${ctx.req.path}`));

    return app;
}

export default await AntelopeTransactionsAPI();