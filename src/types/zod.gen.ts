import { z } from "zod";


export const apiErrorSchema = z.object({ "status": z.union([z.literal(500), z.literal(504), z.literal(400), z.literal(401), z.literal(403), z.literal(404), z.literal(405)]), "code": z.enum(["bad_database_response", "bad_header", "missing_required_header", "bad_query_input", "database_timeout", "forbidden", "internal_server_error", "method_not_allowed", "route_not_found", "unauthorized"]), "message": z.coerce.string() });
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;


export const modelsActionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_index": z.coerce.number(), "tx_status": z.coerce.string(), "tx_status_code": z.coerce.number(), "tx_success": z.boolean(), "abi_sequence": z.coerce.number(), "code_sequence": z.coerce.number(), "digest": z.coerce.string(), "global_sequence": z.coerce.number(), "receipt_receiver": z.coerce.string(), "recv_sequence": z.coerce.number(), "account": z.coerce.string(), "name": z.coerce.string(), "json_data": z.coerce.string(), "raw_data": z.coerce.string(), "index": z.coerce.number(), "receiver": z.coerce.string(), "context_free": z.boolean(), "elapsed": z.coerce.number(), "console": z.coerce.string(), "raw_return_value": z.coerce.string(), "json_return_value": z.coerce.string(), "creator_action_ordinal": z.coerce.number(), "closest_unnotified_ancestor_action_ordinal": z.coerce.number(), "execution_index": z.coerce.number(), "action_mroot": z.coerce.string() });
export type ModelsActionsSchema = z.infer<typeof modelsActionsSchema>;


export const modelsBlocksSchema = z.object({ "time": z.string().datetime(), "number": z.coerce.number(), "hash": z.coerce.string(), "date": z.string().date(), "parent_hash": z.coerce.string(), "producer": z.coerce.string(), "confirmed": z.coerce.number(), "schedule_version": z.coerce.number(), "version": z.coerce.number(), "producer_signature": z.coerce.string(), "dpos_proposed_irreversible_blocknum": z.coerce.number(), "dpos_irreversible_blocknum": z.coerce.number(), "transaction_mroot": z.coerce.string(), "action_mroot": z.coerce.string(), "blockroot_merkle_node_count": z.coerce.number(), "size": z.coerce.number(), "total_transactions": z.coerce.number(), "successful_transactions": z.coerce.number(), "failed_transactions": z.coerce.number(), "total_actions": z.coerce.number(), "total_db_ops": z.coerce.number() });
export type ModelsBlocksSchema = z.infer<typeof modelsBlocksSchema>;


export const modelsDbOpsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_index": z.coerce.number(), "tx_status": z.coerce.string(), "tx_status_code": z.coerce.number(), "tx_success": z.boolean(), "index": z.coerce.number(), "operation": z.coerce.string(), "operation_code": z.coerce.number(), "action_index": z.coerce.number(), "code": z.coerce.string(), "scope": z.coerce.string(), "table_name": z.coerce.string(), "primary_key": z.coerce.string(), "old_payer": z.coerce.string(), "new_payer": z.coerce.string(), "old_data": z.coerce.string(), "new_data": z.coerce.string(), "old_data_json": z.coerce.string(), "new_data_json": z.coerce.string() });
export type ModelsDbOpsSchema = z.infer<typeof modelsDbOpsSchema>;


export const modelsTransactionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "hash": z.coerce.string(), "index": z.coerce.number(), "elapsed": z.coerce.number(), "net_usage": z.coerce.number(), "scheduled": z.boolean(), "cpu_usage_micro_seconds": z.coerce.number(), "net_usage_words": z.coerce.number(), "status": z.coerce.string(), "status_code": z.coerce.number(), "success": z.boolean(), "transaction_mroot": z.coerce.string() });
export type ModelsTransactionsSchema = z.infer<typeof modelsTransactionsSchema>;


export const paginationSchema = z.object({ "next_page": z.coerce.number(), "previous_page": z.coerce.number(), "total_pages": z.coerce.number(), "total_results": z.coerce.number() });
export type PaginationSchema = z.infer<typeof paginationSchema>;


export const queryStatisticsSchema = z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() });
export type QueryStatisticsSchema = z.infer<typeof queryStatisticsSchema>;


export const responseMetadataSchema = z.object({ "statistics": z.lazy(() => queryStatisticsSchema).nullable(), "next_page": z.coerce.number(), "previous_page": z.coerce.number(), "total_pages": z.coerce.number(), "total_results": z.coerce.number() });
export type ResponseMetadataSchema = z.infer<typeof responseMetadataSchema>;


export const versionSchema = z.object({ "version": z.coerce.string().regex(new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$")), "commit": z.coerce.string().regex(new RegExp("^[0-9a-f]{7}$")) });
export type VersionSchema = z.infer<typeof versionSchema>;


export const usageActionsAccountPathParamsSchema = z.object({ "account": z.coerce.string() });
export type UsageActionsAccountPathParamsSchema = z.infer<typeof usageActionsAccountPathParamsSchema>;

 export const usageActionsAccountQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageActionsAccountQueryParamsSchema = z.infer<typeof usageActionsAccountQueryParamsSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsAccount200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsAccount200Schema = z.infer<typeof usageActionsAccount200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsAccountErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsAccountErrorSchema = z.infer<typeof usageActionsAccountErrorSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsAccountQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsAccountQueryResponseSchema = z.infer<typeof usageActionsAccountQueryResponseSchema>;


export const usageActionsDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageActionsDatePathParamsSchema = z.infer<typeof usageActionsDatePathParamsSchema>;

 export const usageActionsDateQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageActionsDateQueryParamsSchema = z.infer<typeof usageActionsDateQueryParamsSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsDate200Schema = z.infer<typeof usageActionsDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsDateErrorSchema = z.infer<typeof usageActionsDateErrorSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsDateQueryResponseSchema = z.infer<typeof usageActionsDateQueryResponseSchema>;


export const usageActionsNamePathParamsSchema = z.object({ "name": z.coerce.string() });
export type UsageActionsNamePathParamsSchema = z.infer<typeof usageActionsNamePathParamsSchema>;

 export const usageActionsNameQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageActionsNameQueryParamsSchema = z.infer<typeof usageActionsNameQueryParamsSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsName200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsName200Schema = z.infer<typeof usageActionsName200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsNameErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsNameErrorSchema = z.infer<typeof usageActionsNameErrorSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsNameQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsNameQueryResponseSchema = z.infer<typeof usageActionsNameQueryResponseSchema>;


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


export const usageDbopsDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageDbopsDatePathParamsSchema = z.infer<typeof usageDbopsDatePathParamsSchema>;

 export const usageDbopsDateQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageDbopsDateQueryParamsSchema = z.infer<typeof usageDbopsDateQueryParamsSchema>;
/**
 * @description Array of dbops.
 */
export const usageDbopsDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageDbopsDate200Schema = z.infer<typeof usageDbopsDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbopsDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbopsDateErrorSchema = z.infer<typeof usageDbopsDateErrorSchema>;
/**
 * @description Array of dbops.
 */
export const usageDbopsDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageDbopsDateQueryResponseSchema = z.infer<typeof usageDbopsDateQueryResponseSchema>;


export const usageDbopsPkPathParamsSchema = z.object({ "pk": z.coerce.string() });
export type UsageDbopsPkPathParamsSchema = z.infer<typeof usageDbopsPkPathParamsSchema>;

 export const usageDbopsPkQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageDbopsPkQueryParamsSchema = z.infer<typeof usageDbopsPkQueryParamsSchema>;
/**
 * @description Array of dbops.
 */
export const usageDbopsPk200Schema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageDbopsPk200Schema = z.infer<typeof usageDbopsPk200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbopsPkErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbopsPkErrorSchema = z.infer<typeof usageDbopsPkErrorSchema>;
/**
 * @description Array of dbops.
 */
export const usageDbopsPkQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageDbopsPkQueryResponseSchema = z.infer<typeof usageDbopsPkQueryResponseSchema>;


export const usageDbopsScopePathParamsSchema = z.object({ "scope": z.coerce.string() });
export type UsageDbopsScopePathParamsSchema = z.infer<typeof usageDbopsScopePathParamsSchema>;

 export const usageDbopsScopeQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageDbopsScopeQueryParamsSchema = z.infer<typeof usageDbopsScopeQueryParamsSchema>;
/**
 * @description Array of dbops.
 */
export const usageDbopsScope200Schema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageDbopsScope200Schema = z.infer<typeof usageDbopsScope200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbopsScopeErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbopsScopeErrorSchema = z.infer<typeof usageDbopsScopeErrorSchema>;
/**
 * @description Array of dbops.
 */
export const usageDbopsScopeQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageDbopsScopeQueryResponseSchema = z.infer<typeof usageDbopsScopeQueryResponseSchema>;

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


export const usageTransactionsDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageTransactionsDatePathParamsSchema = z.infer<typeof usageTransactionsDatePathParamsSchema>;

 export const usageTransactionsDateQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageTransactionsDateQueryParamsSchema = z.infer<typeof usageTransactionsDateQueryParamsSchema>;
/**
 * @description Array of transactions.
 */
export const usageTransactionsDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageTransactionsDate200Schema = z.infer<typeof usageTransactionsDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsDateErrorSchema = z.infer<typeof usageTransactionsDateErrorSchema>;
/**
 * @description Array of transactions.
 */
export const usageTransactionsDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageTransactionsDateQueryResponseSchema = z.infer<typeof usageTransactionsDateQueryResponseSchema>;


export const usageTransactionsHashPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageTransactionsHashPathParamsSchema = z.infer<typeof usageTransactionsHashPathParamsSchema>;

 export const usageTransactionsHashQueryParamsSchema = z.object({ "limit": z.coerce.number().optional(), "page": z.coerce.number().optional() }).optional();
export type UsageTransactionsHashQueryParamsSchema = z.infer<typeof usageTransactionsHashQueryParamsSchema>;
/**
 * @description Array of transactions.
 */
export const usageTransactionsHash200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageTransactionsHash200Schema = z.infer<typeof usageTransactionsHash200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsHashErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsHashErrorSchema = z.infer<typeof usageTransactionsHashErrorSchema>;
/**
 * @description Array of transactions.
 */
export const usageTransactionsHashQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageTransactionsHashQueryResponseSchema = z.infer<typeof usageTransactionsHashQueryResponseSchema>;

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

 export const operations = { "Usage_actionsAccount": {
        request: undefined,
        parameters: {
            path: usageActionsAccountPathParamsSchema,
            query: usageActionsAccountQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsAccountQueryResponseSchema,
            default: usageActionsAccountQueryResponseSchema
        },
        errors: {}
    }, "Usage_actionsDate": {
        request: undefined,
        parameters: {
            path: usageActionsDatePathParamsSchema,
            query: usageActionsDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsDateQueryResponseSchema,
            default: usageActionsDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_actionsName": {
        request: undefined,
        parameters: {
            path: usageActionsNamePathParamsSchema,
            query: usageActionsNameQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsNameQueryResponseSchema,
            default: usageActionsNameQueryResponseSchema
        },
        errors: {}
    }, "Usage_blocksDate": {
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
    }, "Usage_dbopsDate": {
        request: undefined,
        parameters: {
            path: usageDbopsDatePathParamsSchema,
            query: usageDbopsDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbopsDateQueryResponseSchema,
            default: usageDbopsDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_dbopsPk": {
        request: undefined,
        parameters: {
            path: usageDbopsPkPathParamsSchema,
            query: usageDbopsPkQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbopsPkQueryResponseSchema,
            default: usageDbopsPkQueryResponseSchema
        },
        errors: {}
    }, "Usage_dbopsScope": {
        request: undefined,
        parameters: {
            path: usageDbopsScopePathParamsSchema,
            query: usageDbopsScopeQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbopsScopeQueryResponseSchema,
            default: usageDbopsScopeQueryResponseSchema
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
    }, "Usage_transactionsDate": {
        request: undefined,
        parameters: {
            path: usageTransactionsDatePathParamsSchema,
            query: usageTransactionsDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageTransactionsDateQueryResponseSchema,
            default: usageTransactionsDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_transactionsHash": {
        request: undefined,
        parameters: {
            path: usageTransactionsHashPathParamsSchema,
            query: usageTransactionsHashQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageTransactionsHashQueryResponseSchema,
            default: usageTransactionsHashQueryResponseSchema
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
export const paths = { "/actions/account/{account}": {
        get: operations["Usage_actionsAccount"]
    }, "/actions/date/{date}": {
        get: operations["Usage_actionsDate"]
    }, "/actions/name/{name}": {
        get: operations["Usage_actionsName"]
    }, "/blocks/date/{date}": {
        get: operations["Usage_blocksDate"]
    }, "/blocks/hash/{hash}": {
        get: operations["Usage_blocksHash"]
    }, "/blocks/number/{number}": {
        get: operations["Usage_blocksNumber"]
    }, "/dbops/date/{date}": {
        get: operations["Usage_dbopsDate"]
    }, "/dbops/pk/{pk}": {
        get: operations["Usage_dbopsPk"]
    }, "/dbops/scope/{scope}": {
        get: operations["Usage_dbopsScope"]
    }, "/health": {
        get: operations["Monitoring_health"]
    }, "/metrics": {
        get: operations["Monitoring_metrics"]
    }, "/openapi": {
        get: operations["Docs_openapi"]
    }, "/transactions/date/{date}": {
        get: operations["Usage_transactionsDate"]
    }, "/transactions/hash/{hash}": {
        get: operations["Usage_transactionsHash"]
    }, "/version": {
        get: operations["Docs_version"]
    } } as const;