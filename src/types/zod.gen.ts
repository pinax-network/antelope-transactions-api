import { z } from "zod";


export const apiErrorSchema = z.object({ "status": z.union([z.literal(500), z.literal(504), z.literal(400), z.literal(401), z.literal(403), z.literal(404), z.literal(405)]), "code": z.enum(["bad_database_response", "bad_header", "missing_required_header", "bad_query_input", "database_timeout", "forbidden", "internal_server_error", "method_not_allowed", "route_not_found", "unauthorized"]), "message": z.coerce.string() });
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;


export const modelsActionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_index": z.coerce.number(), "tx_status": z.coerce.string(), "tx_status_code": z.coerce.number(), "tx_success": z.boolean(), "abi_sequence": z.coerce.number(), "code_sequence": z.coerce.number(), "digest": z.coerce.string(), "global_sequence": z.coerce.number(), "receipt_receiver": z.coerce.string(), "recv_sequence": z.coerce.number(), "account": z.coerce.string(), "name": z.coerce.string(), "json_data": z.coerce.string(), "raw_data": z.coerce.string(), "action_ordinal": z.coerce.number(), "receiver": z.coerce.string(), "context_free": z.boolean(), "elapsed": z.coerce.number(), "console": z.coerce.string(), "raw_return_value": z.coerce.string(), "json_return_value": z.coerce.string(), "creator_action_ordinal": z.coerce.number(), "closest_unnotified_ancestor_action_ordinal": z.coerce.number(), "execution_index": z.coerce.number(), "action_mroot": z.coerce.string() });
export type ModelsActionsSchema = z.infer<typeof modelsActionsSchema>;


export const modelsAuthorizationsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "action_ordinal": z.coerce.number(), "actor": z.coerce.string(), "permission": z.coerce.string() });
export type ModelsAuthorizationsSchema = z.infer<typeof modelsAuthorizationsSchema>;


export const modelsBlocksSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "previous": z.coerce.string(), "producer": z.coerce.string(), "confirmed": z.coerce.number(), "schedule_version": z.coerce.number(), "version": z.coerce.number(), "producer_signature": z.coerce.string(), "dpos_proposed_irreversible_blocknum": z.coerce.number(), "dpos_irreversible_blocknum": z.coerce.number(), "transaction_mroot": z.coerce.string(), "action_mroot": z.coerce.string(), "blockroot_merkle_node_count": z.coerce.number(), "size": z.coerce.number(), "total_transactions": z.coerce.number(), "successful_transactions": z.coerce.number(), "failed_transactions": z.coerce.number(), "total_actions": z.coerce.number(), "total_db_ops": z.coerce.number() });
export type ModelsBlocksSchema = z.infer<typeof modelsBlocksSchema>;


export const modelsReceiversSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "action_ordinal": z.coerce.number(), "receiver": z.coerce.string() });
export type ModelsReceiversSchema = z.infer<typeof modelsReceiversSchema>;


export const modelsTransactionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "hash": z.coerce.string(), "index": z.coerce.number(), "elapsed": z.coerce.number(), "net_usage": z.coerce.number(), "scheduled": z.boolean(), "cpu_usage_micro_seconds": z.coerce.number(), "net_usage_words": z.coerce.number(), "status": z.coerce.string(), "status_code": z.coerce.number(), "success": z.boolean(), "transaction_mroot": z.coerce.string() });
export type ModelsTransactionsSchema = z.infer<typeof modelsTransactionsSchema>;


export const queryStatisticsSchema = z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() });
export type QueryStatisticsSchema = z.infer<typeof queryStatisticsSchema>;


export const responseMetadataSchema = z.object({ "statistics": z.lazy(() => queryStatisticsSchema).nullable(), "total_results": z.coerce.number() });
export type ResponseMetadataSchema = z.infer<typeof responseMetadataSchema>;


export const searchTransactionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "hash": z.coerce.string(), "index": z.coerce.number(), "elapsed": z.coerce.number(), "net_usage": z.coerce.number(), "scheduled": z.boolean(), "cpu_usage_micro_seconds": z.coerce.number(), "net_usage_words": z.coerce.number(), "status": z.coerce.string(), "status_code": z.coerce.number(), "success": z.boolean(), "transaction_mroot": z.coerce.string(), "actions": z.array(z.lazy(() => modelsActionsSchema)), "authorizations": z.array(z.object({ "tx_hash": z.coerce.string(), "action_ordinal": z.coerce.number(), "actor": z.coerce.string(), "permission": z.coerce.string() })), "receivers": z.array(z.object({ "tx_hash": z.coerce.string(), "action_ordinal": z.coerce.number(), "receiver": z.coerce.string() })) });
export type SearchTransactionsSchema = z.infer<typeof searchTransactionsSchema>;


export const versionSchema = z.object({ "version": z.coerce.string().regex(new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$")), "commit": z.coerce.string().regex(new RegExp("^[0-9a-f]{7}$")) });
export type VersionSchema = z.infer<typeof versionSchema>;


export const usageActionsAccountPathParamsSchema = z.object({ "account": z.coerce.string() });
export type UsageActionsAccountPathParamsSchema = z.infer<typeof usageActionsAccountPathParamsSchema>;

 export const usageActionsAccountQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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

 export const usageActionsDateQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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

 export const usageActionsNameQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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


export const usageActionsNumberPathParamsSchema = z.object({ "number": z.coerce.number() });
export type UsageActionsNumberPathParamsSchema = z.infer<typeof usageActionsNumberPathParamsSchema>;

 export const usageActionsNumberQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageActionsNumberQueryParamsSchema = z.infer<typeof usageActionsNumberQueryParamsSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsNumber200Schema = z.infer<typeof usageActionsNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsNumberErrorSchema = z.infer<typeof usageActionsNumberErrorSchema>;
/**
 * @description Array of actions.
 */
export const usageActionsNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageActionsNumberQueryResponseSchema = z.infer<typeof usageActionsNumberQueryResponseSchema>;


export const usageAuthorizationsActionPathParamsSchema = z.object({ "ordinal": z.coerce.number() });
export type UsageAuthorizationsActionPathParamsSchema = z.infer<typeof usageAuthorizationsActionPathParamsSchema>;

 export const usageAuthorizationsActionQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageAuthorizationsActionQueryParamsSchema = z.infer<typeof usageAuthorizationsActionQueryParamsSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsAction200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsAction200Schema = z.infer<typeof usageAuthorizationsAction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsActionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsActionErrorSchema = z.infer<typeof usageAuthorizationsActionErrorSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsActionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsActionQueryResponseSchema = z.infer<typeof usageAuthorizationsActionQueryResponseSchema>;


export const usageAuthorizationsActorPathParamsSchema = z.object({ "actor": z.coerce.string() });
export type UsageAuthorizationsActorPathParamsSchema = z.infer<typeof usageAuthorizationsActorPathParamsSchema>;

 export const usageAuthorizationsActorQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageAuthorizationsActorQueryParamsSchema = z.infer<typeof usageAuthorizationsActorQueryParamsSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsActor200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsActor200Schema = z.infer<typeof usageAuthorizationsActor200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsActorErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsActorErrorSchema = z.infer<typeof usageAuthorizationsActorErrorSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsActorQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsActorQueryResponseSchema = z.infer<typeof usageAuthorizationsActorQueryResponseSchema>;


export const usageAuthorizationsDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageAuthorizationsDatePathParamsSchema = z.infer<typeof usageAuthorizationsDatePathParamsSchema>;

 export const usageAuthorizationsDateQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageAuthorizationsDateQueryParamsSchema = z.infer<typeof usageAuthorizationsDateQueryParamsSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsDate200Schema = z.infer<typeof usageAuthorizationsDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsDateErrorSchema = z.infer<typeof usageAuthorizationsDateErrorSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsDateQueryResponseSchema = z.infer<typeof usageAuthorizationsDateQueryResponseSchema>;


export const usageAuthorizationsNumberPathParamsSchema = z.object({ "number": z.coerce.number() });
export type UsageAuthorizationsNumberPathParamsSchema = z.infer<typeof usageAuthorizationsNumberPathParamsSchema>;

 export const usageAuthorizationsNumberQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageAuthorizationsNumberQueryParamsSchema = z.infer<typeof usageAuthorizationsNumberQueryParamsSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsNumber200Schema = z.infer<typeof usageAuthorizationsNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsNumberErrorSchema = z.infer<typeof usageAuthorizationsNumberErrorSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsNumberQueryResponseSchema = z.infer<typeof usageAuthorizationsNumberQueryResponseSchema>;


export const usageAuthorizationsPermissionPathParamsSchema = z.object({ "permission": z.coerce.string() });
export type UsageAuthorizationsPermissionPathParamsSchema = z.infer<typeof usageAuthorizationsPermissionPathParamsSchema>;

 export const usageAuthorizationsPermissionQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageAuthorizationsPermissionQueryParamsSchema = z.infer<typeof usageAuthorizationsPermissionQueryParamsSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsPermission200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsPermission200Schema = z.infer<typeof usageAuthorizationsPermission200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsPermissionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsPermissionErrorSchema = z.infer<typeof usageAuthorizationsPermissionErrorSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsPermissionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsPermissionQueryResponseSchema = z.infer<typeof usageAuthorizationsPermissionQueryResponseSchema>;


export const usageAuthorizationsTransactionPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageAuthorizationsTransactionPathParamsSchema = z.infer<typeof usageAuthorizationsTransactionPathParamsSchema>;

 export const usageAuthorizationsTransactionQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageAuthorizationsTransactionQueryParamsSchema = z.infer<typeof usageAuthorizationsTransactionQueryParamsSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsTransaction200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsTransaction200Schema = z.infer<typeof usageAuthorizationsTransaction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsTransactionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsTransactionErrorSchema = z.infer<typeof usageAuthorizationsTransactionErrorSchema>;
/**
 * @description Array of authorizations.
 */
export const usageAuthorizationsTransactionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageAuthorizationsTransactionQueryResponseSchema = z.infer<typeof usageAuthorizationsTransactionQueryResponseSchema>;


export const usageBlocksDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageBlocksDatePathParamsSchema = z.infer<typeof usageBlocksDatePathParamsSchema>;

 export const usageBlocksDateQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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

 export const usageBlocksHashQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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

 export const usageBlocksNumberQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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


export const usageReceiversActionPathParamsSchema = z.object({ "ordinal": z.coerce.number() });
export type UsageReceiversActionPathParamsSchema = z.infer<typeof usageReceiversActionPathParamsSchema>;

 export const usageReceiversActionQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageReceiversActionQueryParamsSchema = z.infer<typeof usageReceiversActionQueryParamsSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversAction200Schema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversAction200Schema = z.infer<typeof usageReceiversAction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageReceiversActionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageReceiversActionErrorSchema = z.infer<typeof usageReceiversActionErrorSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversActionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversActionQueryResponseSchema = z.infer<typeof usageReceiversActionQueryResponseSchema>;


export const usageReceiversDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageReceiversDatePathParamsSchema = z.infer<typeof usageReceiversDatePathParamsSchema>;

 export const usageReceiversDateQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageReceiversDateQueryParamsSchema = z.infer<typeof usageReceiversDateQueryParamsSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversDate200Schema = z.infer<typeof usageReceiversDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageReceiversDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageReceiversDateErrorSchema = z.infer<typeof usageReceiversDateErrorSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversDateQueryResponseSchema = z.infer<typeof usageReceiversDateQueryResponseSchema>;


export const usageReceiversNumberPathParamsSchema = z.object({ "number": z.coerce.number() });
export type UsageReceiversNumberPathParamsSchema = z.infer<typeof usageReceiversNumberPathParamsSchema>;

 export const usageReceiversNumberQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageReceiversNumberQueryParamsSchema = z.infer<typeof usageReceiversNumberQueryParamsSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversNumber200Schema = z.infer<typeof usageReceiversNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageReceiversNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageReceiversNumberErrorSchema = z.infer<typeof usageReceiversNumberErrorSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversNumberQueryResponseSchema = z.infer<typeof usageReceiversNumberQueryResponseSchema>;


export const usageReceiversReceiverPathParamsSchema = z.object({ "receiver": z.coerce.string() });
export type UsageReceiversReceiverPathParamsSchema = z.infer<typeof usageReceiversReceiverPathParamsSchema>;

 export const usageReceiversReceiverQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageReceiversReceiverQueryParamsSchema = z.infer<typeof usageReceiversReceiverQueryParamsSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversReceiver200Schema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversReceiver200Schema = z.infer<typeof usageReceiversReceiver200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageReceiversReceiverErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageReceiversReceiverErrorSchema = z.infer<typeof usageReceiversReceiverErrorSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversReceiverQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversReceiverQueryResponseSchema = z.infer<typeof usageReceiversReceiverQueryResponseSchema>;


export const usageReceiversTransactionPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageReceiversTransactionPathParamsSchema = z.infer<typeof usageReceiversTransactionPathParamsSchema>;

 export const usageReceiversTransactionQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageReceiversTransactionQueryParamsSchema = z.infer<typeof usageReceiversTransactionQueryParamsSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversTransaction200Schema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversTransaction200Schema = z.infer<typeof usageReceiversTransaction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageReceiversTransactionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageReceiversTransactionErrorSchema = z.infer<typeof usageReceiversTransactionErrorSchema>;
/**
 * @description Array of receivers.
 */
export const usageReceiversTransactionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsReceiversSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageReceiversTransactionQueryResponseSchema = z.infer<typeof usageReceiversTransactionQueryResponseSchema>;


export const usageSearchTransactionsQueryParamsSchema = z.object({ "account": z.coerce.string().optional(), "action": z.coerce.string().optional(), "auth": z.coerce.string().optional(), "hash": z.coerce.string().optional(), "number": z.coerce.number().optional(), "receiver": z.coerce.string().optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
export type UsageSearchTransactionsQueryParamsSchema = z.infer<typeof usageSearchTransactionsQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageSearchTransactions200Schema = z.object({ "data": z.array(z.lazy(() => searchTransactionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageSearchTransactions200Schema = z.infer<typeof usageSearchTransactions200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageSearchTransactionsErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageSearchTransactionsErrorSchema = z.infer<typeof usageSearchTransactionsErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageSearchTransactionsQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => searchTransactionsSchema)), "meta": z.lazy(() => responseMetadataSchema) });
export type UsageSearchTransactionsQueryResponseSchema = z.infer<typeof usageSearchTransactionsQueryResponseSchema>;


export const usageTransactionsDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageTransactionsDatePathParamsSchema = z.infer<typeof usageTransactionsDatePathParamsSchema>;

 export const usageTransactionsDateQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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

 export const usageTransactionsHashQueryParamsSchema = z.object({ "first": z.coerce.number().optional(), "skip": z.coerce.number().optional(), "order_by": z.enum(["block_number"]).default("block_number").optional(), "order_direction": z.enum(["asc", "desc"]).default("desc").optional() }).optional();
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
    }, "Usage_actionsNumber": {
        request: undefined,
        parameters: {
            path: usageActionsNumberPathParamsSchema,
            query: usageActionsNumberQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsNumberQueryResponseSchema,
            default: usageActionsNumberQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsAction": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsActionPathParamsSchema,
            query: usageAuthorizationsActionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsActionQueryResponseSchema,
            default: usageAuthorizationsActionQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsActor": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsActorPathParamsSchema,
            query: usageAuthorizationsActorQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsActorQueryResponseSchema,
            default: usageAuthorizationsActorQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsDate": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsDatePathParamsSchema,
            query: usageAuthorizationsDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsDateQueryResponseSchema,
            default: usageAuthorizationsDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsNumber": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsNumberPathParamsSchema,
            query: usageAuthorizationsNumberQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsNumberQueryResponseSchema,
            default: usageAuthorizationsNumberQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsPermission": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsPermissionPathParamsSchema,
            query: usageAuthorizationsPermissionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsPermissionQueryResponseSchema,
            default: usageAuthorizationsPermissionQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsTransaction": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsTransactionPathParamsSchema,
            query: usageAuthorizationsTransactionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsTransactionQueryResponseSchema,
            default: usageAuthorizationsTransactionQueryResponseSchema
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
    }, "Usage_receiversAction": {
        request: undefined,
        parameters: {
            path: usageReceiversActionPathParamsSchema,
            query: usageReceiversActionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageReceiversActionQueryResponseSchema,
            default: usageReceiversActionQueryResponseSchema
        },
        errors: {}
    }, "Usage_receiversDate": {
        request: undefined,
        parameters: {
            path: usageReceiversDatePathParamsSchema,
            query: usageReceiversDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageReceiversDateQueryResponseSchema,
            default: usageReceiversDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_receiversNumber": {
        request: undefined,
        parameters: {
            path: usageReceiversNumberPathParamsSchema,
            query: usageReceiversNumberQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageReceiversNumberQueryResponseSchema,
            default: usageReceiversNumberQueryResponseSchema
        },
        errors: {}
    }, "Usage_receiversReceiver": {
        request: undefined,
        parameters: {
            path: usageReceiversReceiverPathParamsSchema,
            query: usageReceiversReceiverQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageReceiversReceiverQueryResponseSchema,
            default: usageReceiversReceiverQueryResponseSchema
        },
        errors: {}
    }, "Usage_receiversTransaction": {
        request: undefined,
        parameters: {
            path: usageReceiversTransactionPathParamsSchema,
            query: usageReceiversTransactionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageReceiversTransactionQueryResponseSchema,
            default: usageReceiversTransactionQueryResponseSchema
        },
        errors: {}
    }, "Usage_searchTransactions": {
        request: undefined,
        parameters: {
            path: undefined,
            query: usageSearchTransactionsQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageSearchTransactionsQueryResponseSchema,
            default: usageSearchTransactionsQueryResponseSchema
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
    }, "/actions/number/{number}": {
        get: operations["Usage_actionsNumber"]
    }, "/authorizations/action/{ordinal}": {
        get: operations["Usage_authorizationsAction"]
    }, "/authorizations/actor/{actor}": {
        get: operations["Usage_authorizationsActor"]
    }, "/authorizations/date/{date}": {
        get: operations["Usage_authorizationsDate"]
    }, "/authorizations/number/{number}": {
        get: operations["Usage_authorizationsNumber"]
    }, "/authorizations/permission/{permission}": {
        get: operations["Usage_authorizationsPermission"]
    }, "/authorizations/transaction/{hash}": {
        get: operations["Usage_authorizationsTransaction"]
    }, "/blocks/date/{date}": {
        get: operations["Usage_blocksDate"]
    }, "/blocks/hash/{hash}": {
        get: operations["Usage_blocksHash"]
    }, "/blocks/number/{number}": {
        get: operations["Usage_blocksNumber"]
    }, "/health": {
        get: operations["Monitoring_health"]
    }, "/metrics": {
        get: operations["Monitoring_metrics"]
    }, "/openapi": {
        get: operations["Docs_openapi"]
    }, "/receivers/action/{ordinal}": {
        get: operations["Usage_receiversAction"]
    }, "/receivers/date/{date}": {
        get: operations["Usage_receiversDate"]
    }, "/receivers/number/{number}": {
        get: operations["Usage_receiversNumber"]
    }, "/receivers/receiver/{receiver}": {
        get: operations["Usage_receiversReceiver"]
    }, "/receivers/transaction/{hash}": {
        get: operations["Usage_receiversTransaction"]
    }, "/search/transactions": {
        get: operations["Usage_searchTransactions"]
    }, "/transactions/date/{date}": {
        get: operations["Usage_transactionsDate"]
    }, "/transactions/hash/{hash}": {
        get: operations["Usage_transactionsHash"]
    }, "/version": {
        get: operations["Docs_version"]
    } } as const;