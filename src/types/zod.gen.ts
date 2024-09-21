import { z } from "zod";


export const apiErrorSchema = z.object({ "status": z.union([z.literal(500), z.literal(504), z.literal(400), z.literal(401), z.literal(403), z.literal(404), z.literal(405)]), "code": z.enum(["bad_database_response", "bad_header", "missing_required_header", "bad_query_input", "database_timeout", "forbidden", "internal_server_error", "method_not_allowed", "route_not_found", "unauthorized"]), "message": z.coerce.string() });
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;


export const modelsActionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_success": z.boolean(), "abi_sequence": z.coerce.number(), "code_sequence": z.coerce.number(), "digest": z.coerce.string(), "global_sequence": z.coerce.number(), "receipt_receiver": z.coerce.string(), "recv_sequence": z.coerce.number(), "account": z.coerce.string(), "name": z.coerce.string(), "json_data": z.coerce.string(), "raw_data": z.coerce.string(), "index": z.coerce.number(), "action_ordinal": z.coerce.number(), "receiver": z.coerce.string(), "context_free": z.boolean(), "elapsed": z.coerce.number(), "console": z.coerce.string(), "raw_return_value": z.coerce.string(), "json_return_value": z.coerce.string(), "creator_action_ordinal": z.coerce.number(), "closest_unnotified_ancestor_action_ordinal": z.coerce.number(), "action_mroot": z.coerce.string() });
export type ModelsActionsSchema = z.infer<typeof modelsActionsSchema>;


export const modelsAuthorizationsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_success": z.boolean(), "action_index": z.coerce.number(), "index": z.coerce.number(), "actor": z.coerce.string(), "permission": z.coerce.string() });
export type ModelsAuthorizationsSchema = z.infer<typeof modelsAuthorizationsSchema>;


export const modelsBlocksSchema = z.object({ "time": z.string().datetime(), "number": z.coerce.number(), "hash": z.coerce.string(), "date": z.string().date(), "previous": z.coerce.string(), "producer": z.coerce.string(), "confirmed": z.coerce.number(), "schedule_version": z.coerce.number(), "version": z.coerce.number(), "producer_signature": z.coerce.string(), "dpos_proposed_irreversible_blocknum": z.coerce.number(), "dpos_irreversible_blocknum": z.coerce.number(), "transaction_mroot": z.coerce.string(), "action_mroot": z.coerce.string(), "blockroot_merkle_node_count": z.coerce.number(), "size": z.coerce.number(), "total_transactions": z.coerce.number(), "successful_transactions": z.coerce.number(), "failed_transactions": z.coerce.number(), "total_actions": z.coerce.number(), "total_db_ops": z.coerce.number() });
export type ModelsBlocksSchema = z.infer<typeof modelsBlocksSchema>;


export const modelsTransactionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "hash": z.coerce.string(), "index": z.coerce.number(), "elapsed": z.coerce.number(), "net_usage": z.coerce.number(), "scheduled": z.boolean(), "cpu_usage_micro_seconds": z.coerce.number(), "net_usage_words": z.coerce.number(), "status": z.coerce.string(), "status_code": z.coerce.number(), "success": z.boolean(), "transaction_mroot": z.coerce.string() });
export type ModelsTransactionsSchema = z.infer<typeof modelsTransactionsSchema>;


export const versionSchema = z.object({ "version": z.coerce.string().regex(new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$")), "commit": z.coerce.string().regex(new RegExp("^[0-9a-f]{7}$")) });
export type VersionSchema = z.infer<typeof versionSchema>;


export const usageActionsByTransactionPathParamsSchema = z.object({ "tx_hash": z.coerce.string() });
export type UsageActionsByTransactionPathParamsSchema = z.infer<typeof usageActionsByTransactionPathParamsSchema>;

 export const usageActionsByTransactionQueryParamsSchema = z.object({ "order_by": z.enum(["index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageActionsByTransactionQueryParamsSchema = z.infer<typeof usageActionsByTransactionQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByTransaction200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageActionsByTransaction200Schema = z.infer<typeof usageActionsByTransaction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsByTransactionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsByTransactionErrorSchema = z.infer<typeof usageActionsByTransactionErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByTransactionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageActionsByTransactionQueryResponseSchema = z.infer<typeof usageActionsByTransactionQueryResponseSchema>;


export const usageAuthorizationsPathParamsSchema = z.object({ "tx_hash": z.coerce.string() });
export type UsageAuthorizationsPathParamsSchema = z.infer<typeof usageAuthorizationsPathParamsSchema>;

 export const usageAuthorizationsQueryParamsSchema = z.object({ "action_index": z.coerce.number().optional(), "order_by": z.enum(["action_index,index", "action_index", "index"]).default("action_index,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageAuthorizationsQueryParamsSchema = z.infer<typeof usageAuthorizationsQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizations200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageAuthorizations200Schema = z.infer<typeof usageAuthorizations200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsErrorSchema = z.infer<typeof usageAuthorizationsErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageAuthorizationsQueryResponseSchema = z.infer<typeof usageAuthorizationsQueryResponseSchema>;


export const usageBlocksByDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageBlocksByDatePathParamsSchema = z.infer<typeof usageBlocksByDatePathParamsSchema>;

 export const usageBlocksByDateQueryParamsSchema = z.object({ "order_by": z.enum(["number"]).default("number").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageBlocksByDateQueryParamsSchema = z.infer<typeof usageBlocksByDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageBlocksByDate200Schema = z.infer<typeof usageBlocksByDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksByDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksByDateErrorSchema = z.infer<typeof usageBlocksByDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageBlocksByDateQueryResponseSchema = z.infer<typeof usageBlocksByDateQueryResponseSchema>;


export const usageBlocksByHashPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageBlocksByHashPathParamsSchema = z.infer<typeof usageBlocksByHashPathParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByHash200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageBlocksByHash200Schema = z.infer<typeof usageBlocksByHash200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksByHashErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksByHashErrorSchema = z.infer<typeof usageBlocksByHashErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByHashQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageBlocksByHashQueryResponseSchema = z.infer<typeof usageBlocksByHashQueryResponseSchema>;


export const usageBlocksByNumberPathParamsSchema = z.object({ "number": z.coerce.number() });
export type UsageBlocksByNumberPathParamsSchema = z.infer<typeof usageBlocksByNumberPathParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageBlocksByNumber200Schema = z.infer<typeof usageBlocksByNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksByNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksByNumberErrorSchema = z.infer<typeof usageBlocksByNumberErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageBlocksByNumberQueryResponseSchema = z.infer<typeof usageBlocksByNumberQueryResponseSchema>;


export const usageDbOpsPathParamsSchema = z.object({ "tx_hash": z.coerce.string() });
export type UsageDbOpsPathParamsSchema = z.infer<typeof usageDbOpsPathParamsSchema>;

 export const usageDbOpsQueryParamsSchema = z.object({ "action_index": z.coerce.number().optional(), "order_by": z.enum(["index", "action_index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageDbOpsQueryParamsSchema = z.infer<typeof usageDbOpsQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOps200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageDbOps200Schema = z.infer<typeof usageDbOps200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbOpsErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbOpsErrorSchema = z.infer<typeof usageDbOpsErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageDbOpsQueryResponseSchema = z.infer<typeof usageDbOpsQueryResponseSchema>;

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


export const usageTransactionsByBlockDatePathParamsSchema = z.object({ "block_date": z.string().date() });
export type UsageTransactionsByBlockDatePathParamsSchema = z.infer<typeof usageTransactionsByBlockDatePathParamsSchema>;

 export const usageTransactionsByBlockDateQueryParamsSchema = z.object({ "order_by": z.enum(["block_number,index", "block_number", "index"]).default("block_number,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageTransactionsByBlockDateQueryParamsSchema = z.infer<typeof usageTransactionsByBlockDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageTransactionsByBlockDate200Schema = z.infer<typeof usageTransactionsByBlockDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsByBlockDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsByBlockDateErrorSchema = z.infer<typeof usageTransactionsByBlockDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageTransactionsByBlockDateQueryResponseSchema = z.infer<typeof usageTransactionsByBlockDateQueryResponseSchema>;


export const usageTransactionsByBlockNumberPathParamsSchema = z.object({ "block_number": z.coerce.number() });
export type UsageTransactionsByBlockNumberPathParamsSchema = z.infer<typeof usageTransactionsByBlockNumberPathParamsSchema>;

 export const usageTransactionsByBlockNumberQueryParamsSchema = z.object({ "order_by": z.enum(["index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageTransactionsByBlockNumberQueryParamsSchema = z.infer<typeof usageTransactionsByBlockNumberQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageTransactionsByBlockNumber200Schema = z.infer<typeof usageTransactionsByBlockNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsByBlockNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsByBlockNumberErrorSchema = z.infer<typeof usageTransactionsByBlockNumberErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageTransactionsByBlockNumberQueryResponseSchema = z.infer<typeof usageTransactionsByBlockNumberQueryResponseSchema>;


export const usageTransactionsByHashPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageTransactionsByHashPathParamsSchema = z.infer<typeof usageTransactionsByHashPathParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByHash200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageTransactionsByHash200Schema = z.infer<typeof usageTransactionsByHash200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsByHashErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsByHashErrorSchema = z.infer<typeof usageTransactionsByHashErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByHashQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number(), "meta": z.array(z.object({ "name": z.coerce.string(), "type": z.coerce.string() })) });
export type UsageTransactionsByHashQueryResponseSchema = z.infer<typeof usageTransactionsByHashQueryResponseSchema>;

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

 export const operations = { "Usage_actionsByTransaction": {
        request: undefined,
        parameters: {
            path: usageActionsByTransactionPathParamsSchema,
            query: usageActionsByTransactionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsByTransactionQueryResponseSchema,
            default: usageActionsByTransactionQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizations": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsPathParamsSchema,
            query: usageAuthorizationsQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsQueryResponseSchema,
            default: usageAuthorizationsQueryResponseSchema
        },
        errors: {}
    }, "Usage_blocksByDate": {
        request: undefined,
        parameters: {
            path: usageBlocksByDatePathParamsSchema,
            query: usageBlocksByDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageBlocksByDateQueryResponseSchema,
            default: usageBlocksByDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_blocksByHash": {
        request: undefined,
        parameters: {
            path: usageBlocksByHashPathParamsSchema,
            query: undefined,
            header: undefined
        },
        responses: {
            200: usageBlocksByHashQueryResponseSchema,
            default: usageBlocksByHashQueryResponseSchema
        },
        errors: {}
    }, "Usage_blocksByNumber": {
        request: undefined,
        parameters: {
            path: usageBlocksByNumberPathParamsSchema,
            query: undefined,
            header: undefined
        },
        responses: {
            200: usageBlocksByNumberQueryResponseSchema,
            default: usageBlocksByNumberQueryResponseSchema
        },
        errors: {}
    }, "Usage_db_ops": {
        request: undefined,
        parameters: {
            path: usageDbOpsPathParamsSchema,
            query: usageDbOpsQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbOpsQueryResponseSchema,
            default: usageDbOpsQueryResponseSchema
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
    }, "Usage_transactionsByBlockDate": {
        request: undefined,
        parameters: {
            path: usageTransactionsByBlockDatePathParamsSchema,
            query: usageTransactionsByBlockDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageTransactionsByBlockDateQueryResponseSchema,
            default: usageTransactionsByBlockDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_transactionsByBlockNumber": {
        request: undefined,
        parameters: {
            path: usageTransactionsByBlockNumberPathParamsSchema,
            query: usageTransactionsByBlockNumberQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageTransactionsByBlockNumberQueryResponseSchema,
            default: usageTransactionsByBlockNumberQueryResponseSchema
        },
        errors: {}
    }, "Usage_transactionsByHash": {
        request: undefined,
        parameters: {
            path: usageTransactionsByHashPathParamsSchema,
            query: undefined,
            header: undefined
        },
        responses: {
            200: usageTransactionsByHashQueryResponseSchema,
            default: usageTransactionsByHashQueryResponseSchema
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
export const paths = { "/actions/tx_hash/{tx_hash}": {
        get: operations["Usage_actionsByTransaction"]
    }, "/authorizations/tx_hash/{tx_hash}": {
        get: operations["Usage_authorizations"]
    }, "/blocks/date/{date}": {
        get: operations["Usage_blocksByDate"]
    }, "/blocks/hash/{hash}": {
        get: operations["Usage_blocksByHash"]
    }, "/blocks/number/{number}": {
        get: operations["Usage_blocksByNumber"]
    }, "/db_ops/tx_hash/{tx_hash}": {
        get: operations["Usage_db_ops"]
    }, "/health": {
        get: operations["Monitoring_health"]
    }, "/metrics": {
        get: operations["Monitoring_metrics"]
    }, "/openapi": {
        get: operations["Docs_openapi"]
    }, "/transactions/block_date/{block_date}": {
        get: operations["Usage_transactionsByBlockDate"]
    }, "/transactions/block_number/{block_number}": {
        get: operations["Usage_transactionsByBlockNumber"]
    }, "/transactions/hash/{hash}": {
        get: operations["Usage_transactionsByHash"]
    }, "/version": {
        get: operations["Docs_version"]
    } } as const;