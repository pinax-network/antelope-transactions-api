import { z } from "zod";


export const apiErrorSchema = z.object({ "status": z.union([z.literal(500), z.literal(504), z.literal(400), z.literal(401), z.literal(403), z.literal(404), z.literal(405)]), "code": z.enum(["bad_database_response", "bad_header", "missing_required_header", "bad_query_input", "database_timeout", "forbidden", "internal_server_error", "method_not_allowed", "route_not_found", "unauthorized"]), "message": z.coerce.string() });
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;


export const modelsBlocksSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "parent_hash": z.coerce.string(), "producer": z.coerce.string(), "confirmed": z.coerce.number(), "schedule_version": z.coerce.number(), "version": z.coerce.number(), "producer_signature": z.coerce.string(), "dpos_proposed_irreversible_blocknum": z.coerce.number(), "dpos_irreversible_blocknum": z.coerce.number(), "transaction_mroot": z.coerce.string(), "action_mroot": z.coerce.string(), "blockroot_merkle_node_count": z.coerce.number(), "size": z.coerce.number(), "total_transactions": z.coerce.number(), "successful_transactions": z.coerce.number(), "failed_transactions": z.coerce.number(), "total_actions": z.coerce.number(), "total_db_ops": z.coerce.number() });
export type ModelsBlocksSchema = z.infer<typeof modelsBlocksSchema>;


export const paginationSchema = z.object({ "next_page": z.coerce.number(), "previous_page": z.coerce.number(), "total_pages": z.coerce.number(), "total_results": z.coerce.number() });
export type PaginationSchema = z.infer<typeof paginationSchema>;


export const queryStatisticsSchema = z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() });
export type QueryStatisticsSchema = z.infer<typeof queryStatisticsSchema>;


export const responseMetadataSchema = z.object({ "statistics": z.lazy(() => queryStatisticsSchema).nullable(), "next_page": z.coerce.number(), "previous_page": z.coerce.number(), "total_pages": z.coerce.number(), "total_results": z.coerce.number() });
export type ResponseMetadataSchema = z.infer<typeof responseMetadataSchema>;


export const versionSchema = z.object({ "version": z.coerce.string().regex(new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$")), "commit": z.coerce.string().regex(new RegExp("^[0-9a-f]{7}$")) });
export type VersionSchema = z.infer<typeof versionSchema>;


export const usageBlocksDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageBlocksDatePathParamsSchema = z.infer<typeof usageBlocksDatePathParamsSchema>;

 export const usageBlocksDateQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageBlocksDateQueryParamsSchema = z.infer<typeof usageBlocksDateQueryParamsSchema>;
/**
 * @description Array of blocks.
 */
export const usageBlocksDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageBlocksDate200Schema = z.infer<typeof usageBlocksDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksDateErrorSchema = z.infer<typeof usageBlocksDateErrorSchema>;
/**
 * @description Array of blocks.
 */
export const usageBlocksDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageBlocksDateQueryResponseSchema = z.infer<typeof usageBlocksDateQueryResponseSchema>;


export const usageBlocksHashPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageBlocksHashPathParamsSchema = z.infer<typeof usageBlocksHashPathParamsSchema>;

 export const usageBlocksHashQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageBlocksHashQueryParamsSchema = z.infer<typeof usageBlocksHashQueryParamsSchema>;
/**
 * @description Array of blocks.
 */
export const usageBlocksHash200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageBlocksHash200Schema = z.infer<typeof usageBlocksHash200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksHashErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksHashErrorSchema = z.infer<typeof usageBlocksHashErrorSchema>;
/**
 * @description Array of blocks.
 */
export const usageBlocksHashQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageBlocksHashQueryResponseSchema = z.infer<typeof usageBlocksHashQueryResponseSchema>;


export const usageBlocksNumberPathParamsSchema = z.object({ "number": z.coerce.number() });
export type UsageBlocksNumberPathParamsSchema = z.infer<typeof usageBlocksNumberPathParamsSchema>;

 export const usageBlocksNumberQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageBlocksNumberQueryParamsSchema = z.infer<typeof usageBlocksNumberQueryParamsSchema>;
/**
 * @description Array of blocks.
 */
export const usageBlocksNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageBlocksNumber200Schema = z.infer<typeof usageBlocksNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksNumberErrorSchema = z.infer<typeof usageBlocksNumberErrorSchema>;
/**
 * @description Array of blocks.
 */
export const usageBlocksNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageBlocksNumberQueryResponseSchema = z.infer<typeof usageBlocksNumberQueryResponseSchema>;

 /**
 * @description OK or ApiError.
 */
export const monitoringHealth200Schema = z.coerce.string();
export type MonitoringHealth200Schema = z.infer<typeof monitoringHealth200Schema>;
/**
 * @description An unexpected error response.
 */
export const monitoringHealthErrorSchema = z.lazy(() => apiErrorSchema);
export type MonitoringHealthErrorSchema = z.infer<typeof monitoringHealthErrorSchema>;
/**
 * @description OK or ApiError.
 */
export const monitoringHealthQueryResponseSchema = z.coerce.string();
export type MonitoringHealthQueryResponseSchema = z.infer<typeof monitoringHealthQueryResponseSchema>;

 /**
 * @description Metrics as text.
 */
export const monitoringMetrics200Schema = z.coerce.string();
export type MonitoringMetrics200Schema = z.infer<typeof monitoringMetrics200Schema>;
/**
 * @description An unexpected error response.
 */
export const monitoringMetricsErrorSchema = z.lazy(() => apiErrorSchema);
export type MonitoringMetricsErrorSchema = z.infer<typeof monitoringMetricsErrorSchema>;
/**
 * @description Metrics as text.
 */
export const monitoringMetricsQueryResponseSchema = z.coerce.string();
export type MonitoringMetricsQueryResponseSchema = z.infer<typeof monitoringMetricsQueryResponseSchema>;

 /**
 * @description The OpenAPI JSON spec
 */
export const docsOpenapi200Schema = z.object({});
export type DocsOpenapi200Schema = z.infer<typeof docsOpenapi200Schema>;
/**
 * @description An unexpected error response.
 */
export const docsOpenapiErrorSchema = z.lazy(() => apiErrorSchema);
export type DocsOpenapiErrorSchema = z.infer<typeof docsOpenapiErrorSchema>;
/**
 * @description The OpenAPI JSON spec
 */
export const docsOpenapiQueryResponseSchema = z.object({});
export type DocsOpenapiQueryResponseSchema = z.infer<typeof docsOpenapiQueryResponseSchema>;

 /**
 * @description The Api version and commit hash.
 */
export const docsVersion200Schema = z.lazy(() => versionSchema);
export type DocsVersion200Schema = z.infer<typeof docsVersion200Schema>;
/**
 * @description An unexpected error response.
 */
export const docsVersionErrorSchema = z.lazy(() => apiErrorSchema);
export type DocsVersionErrorSchema = z.infer<typeof docsVersionErrorSchema>;
/**
 * @description The Api version and commit hash.
 */
export const docsVersionQueryResponseSchema = z.lazy(() => versionSchema);
export type DocsVersionQueryResponseSchema = z.infer<typeof docsVersionQueryResponseSchema>;

 export const operations = { "Usage_blocksDate": {
        request: undefined,
        parameters: {
            path: usageBlocksDatePathParamsSchema,
            query: usageBlocksDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageBlocksDateQueryResponseSchema,
            default: usageBlocksDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_blocksHash": {
        request: undefined,
        parameters: {
            path: usageBlocksHashPathParamsSchema,
            query: usageBlocksHashQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageBlocksHashQueryResponseSchema,
            default: usageBlocksHashQueryResponseSchema
        },
        errors: {}
    }, "Usage_blocksNumber": {
        request: undefined,
        parameters: {
            path: usageBlocksNumberPathParamsSchema,
            query: usageBlocksNumberQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageBlocksNumberQueryResponseSchema,
            default: usageBlocksNumberQueryResponseSchema
        },
        errors: {}
    }, "Monitoring_health": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: monitoringHealthQueryResponseSchema,
            default: monitoringHealthQueryResponseSchema
        },
        errors: {}
    }, "Monitoring_metrics": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: monitoringMetricsQueryResponseSchema,
            default: monitoringMetricsQueryResponseSchema
        },
        errors: {}
    }, "Docs_openapi": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: docsOpenapiQueryResponseSchema,
            default: docsOpenapiQueryResponseSchema
        },
        errors: {}
    }, "Docs_version": {
        request: undefined,
        parameters: {
            path: undefined,
            query: undefined,
            header: undefined
        },
        responses: {
            200: docsVersionQueryResponseSchema,
            default: docsVersionQueryResponseSchema
        },
        errors: {}
    } } as const;
export const paths = { "/blocks/{date}": {
        get: operations["Usage_blocksDate"]
    }, "/blocks/{hash}": {
        get: operations["Usage_blocksHash"]
    }, "/blocks/{number}": {
        get: operations["Usage_blocksNumber"]
    }, "/health": {
        get: operations["Monitoring_health"]
    }, "/metrics": {
        get: operations["Monitoring_metrics"]
    }, "/openapi": {
        get: operations["Docs_openapi"]
    }, "/version": {
        get: operations["Docs_version"]
    } } as const;