import { z } from "zod";


export const apiErrorSchema = z.object({ "status": z.union([z.literal(500), z.literal(504), z.literal(400), z.literal(401), z.literal(403), z.literal(404), z.literal(405)]), "code": z.enum(["bad_database_response", "bad_header", "missing_required_header", "bad_query_input", "database_timeout", "forbidden", "internal_server_error", "method_not_allowed", "route_not_found", "unauthorized", "not_found_data"]), "message": z.coerce.string() });
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;


export const modelsActionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_success": z.boolean(), "abi_sequence": z.coerce.number(), "code_sequence": z.coerce.number(), "digest": z.coerce.string(), "global_sequence": z.coerce.number(), "receipt_receiver": z.coerce.string(), "recv_sequence": z.coerce.number(), "account": z.coerce.string(), "name": z.coerce.string(), "json_data": z.coerce.string(), "raw_data": z.coerce.string(), "index": z.coerce.number(), "action_ordinal": z.coerce.number(), "receiver": z.coerce.string(), "context_free": z.boolean(), "elapsed": z.coerce.number(), "console": z.coerce.string(), "raw_return_value": z.coerce.string(), "json_return_value": z.coerce.string(), "creator_action_ordinal": z.coerce.number(), "closest_unnotified_ancestor_action_ordinal": z.coerce.number(), "action_mroot": z.coerce.string() });
export type ModelsActionsSchema = z.infer<typeof modelsActionsSchema>;


export const modelsAuthorizationsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_success": z.boolean(), "action_index": z.coerce.number(), "index": z.coerce.number(), "actor": z.coerce.string(), "permission": z.coerce.string() });
export type ModelsAuthorizationsSchema = z.infer<typeof modelsAuthorizationsSchema>;


export const modelsBlocksSchema = z.object({ "time": z.string().datetime(), "number": z.coerce.number(), "hash": z.coerce.string(), "date": z.string().date(), "previous": z.coerce.string(), "producer": z.coerce.string(), "confirmed": z.coerce.number(), "schedule_version": z.coerce.number(), "version": z.coerce.number(), "producer_signature": z.coerce.string(), "dpos_proposed_irreversible_blocknum": z.coerce.number(), "dpos_irreversible_blocknum": z.coerce.number(), "transaction_mroot": z.coerce.string(), "action_mroot": z.coerce.string(), "blockroot_merkle_node_count": z.coerce.number(), "size": z.coerce.number(), "total_transactions": z.coerce.number(), "successful_transactions": z.coerce.number(), "failed_transactions": z.coerce.number(), "total_actions": z.coerce.number(), "total_db_ops": z.coerce.number() });
export type ModelsBlocksSchema = z.infer<typeof modelsBlocksSchema>;


export const modelsDbOpsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "tx_hash": z.coerce.string(), "tx_success": z.boolean(), "action_index": z.coerce.number(), "index": z.coerce.number(), "operation": z.coerce.string(), "operation_code": z.coerce.number(), "code": z.coerce.string(), "scope": z.coerce.string(), "table_name": z.coerce.string(), "primary_key": z.coerce.string(), "old_payer": z.coerce.string(), "new_payer": z.coerce.string(), "old_data": z.coerce.string(), "new_data": z.coerce.string(), "old_data_json": z.coerce.string(), "new_data_json": z.coerce.string() });
export type ModelsDbOpsSchema = z.infer<typeof modelsDbOpsSchema>;


export const modelsTransactionsSchema = z.object({ "block_time": z.string().datetime(), "block_number": z.coerce.number(), "block_hash": z.coerce.string(), "block_date": z.string().date(), "hash": z.coerce.string(), "index": z.coerce.number(), "elapsed": z.coerce.number(), "net_usage": z.coerce.number(), "scheduled": z.boolean(), "cpu_usage_micro_seconds": z.coerce.number(), "net_usage_words": z.coerce.number(), "status": z.enum(["Executed"]), "status_code": z.coerce.number(), "success": z.boolean(), "transaction_mroot": z.coerce.string() });
export type ModelsTransactionsSchema = z.infer<typeof modelsTransactionsSchema>;


export const versionSchema = z.object({ "version": z.coerce.string().regex(new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$")), "commit": z.coerce.string().regex(new RegExp("^[0-9a-f]{7}$")) });
export type VersionSchema = z.infer<typeof versionSchema>;


export const usageActionsByDatePathParamsSchema = z.object({ "block_date": z.string().date() });
export type UsageActionsByDatePathParamsSchema = z.infer<typeof usageActionsByDatePathParamsSchema>;

 export const usageActionsByDateQueryParamsSchema = z.object({ "account": z.coerce.string().optional(), "name": z.coerce.string().optional(), "receiver": z.coerce.string().optional(), "order_by": z.enum(["block_number,index", "block_number"]).default("block_number,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageActionsByDateQueryParamsSchema = z.infer<typeof usageActionsByDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageActionsByDate200Schema = z.infer<typeof usageActionsByDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsByDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsByDateErrorSchema = z.infer<typeof usageActionsByDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageActionsByDateQueryResponseSchema = z.infer<typeof usageActionsByDateQueryResponseSchema>;


export const usageActionsByBlockPathParamsSchema = z.object({ "block_number": z.coerce.number() });
export type UsageActionsByBlockPathParamsSchema = z.infer<typeof usageActionsByBlockPathParamsSchema>;

 export const usageActionsByBlockQueryParamsSchema = z.object({ "account": z.coerce.string().optional(), "name": z.coerce.string().optional(), "receiver": z.coerce.string().optional(), "order_by": z.enum(["block_number,index", "block_number"]).default("block_number,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageActionsByBlockQueryParamsSchema = z.infer<typeof usageActionsByBlockQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByBlock200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageActionsByBlock200Schema = z.infer<typeof usageActionsByBlock200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsByBlockErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsByBlockErrorSchema = z.infer<typeof usageActionsByBlockErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByBlockQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageActionsByBlockQueryResponseSchema = z.infer<typeof usageActionsByBlockQueryResponseSchema>;


export const usageActionsByTransactionPathParamsSchema = z.object({ "tx_hash": z.coerce.string() });
export type UsageActionsByTransactionPathParamsSchema = z.infer<typeof usageActionsByTransactionPathParamsSchema>;

 export const usageActionsByTransactionQueryParamsSchema = z.object({ "account": z.coerce.string().optional(), "name": z.coerce.string().optional(), "receiver": z.coerce.string().optional(), "order_by": z.enum(["index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageActionsByTransactionQueryParamsSchema = z.infer<typeof usageActionsByTransactionQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByTransaction200Schema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageActionsByTransaction200Schema = z.infer<typeof usageActionsByTransaction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageActionsByTransactionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageActionsByTransactionErrorSchema = z.infer<typeof usageActionsByTransactionErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageActionsByTransactionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsActionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageActionsByTransactionQueryResponseSchema = z.infer<typeof usageActionsByTransactionQueryResponseSchema>;


export const usageAuthorizationsByDatePathParamsSchema = z.object({ "block_date": z.string().date() });
export type UsageAuthorizationsByDatePathParamsSchema = z.infer<typeof usageAuthorizationsByDatePathParamsSchema>;

 export const usageAuthorizationsByDateQueryParamsSchema = z.object({ "actor": z.coerce.string().optional(), "permission": z.coerce.string().optional(), "action_index": z.coerce.number().optional(), "order_by": z.enum(["block_number,action_index,index", "block_number", "action_index", "index"]).default("block_number,action_index,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageAuthorizationsByDateQueryParamsSchema = z.infer<typeof usageAuthorizationsByDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsByDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageAuthorizationsByDate200Schema = z.infer<typeof usageAuthorizationsByDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsByDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsByDateErrorSchema = z.infer<typeof usageAuthorizationsByDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsByDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageAuthorizationsByDateQueryResponseSchema = z.infer<typeof usageAuthorizationsByDateQueryResponseSchema>;


export const usageAuthorizationsByBlockPathParamsSchema = z.object({ "block_number": z.coerce.number() });
export type UsageAuthorizationsByBlockPathParamsSchema = z.infer<typeof usageAuthorizationsByBlockPathParamsSchema>;

 export const usageAuthorizationsByBlockQueryParamsSchema = z.object({ "actor": z.coerce.string().optional(), "permission": z.coerce.string().optional(), "action_index": z.coerce.number().optional(), "order_by": z.enum(["block_number,action_index,index", "block_number", "action_index", "index"]).default("block_number,action_index,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageAuthorizationsByBlockQueryParamsSchema = z.infer<typeof usageAuthorizationsByBlockQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsByBlock200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageAuthorizationsByBlock200Schema = z.infer<typeof usageAuthorizationsByBlock200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsByBlockErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsByBlockErrorSchema = z.infer<typeof usageAuthorizationsByBlockErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsByBlockQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageAuthorizationsByBlockQueryResponseSchema = z.infer<typeof usageAuthorizationsByBlockQueryResponseSchema>;


export const usageAuthorizationsByTransactionPathParamsSchema = z.object({ "tx_hash": z.coerce.string() });
export type UsageAuthorizationsByTransactionPathParamsSchema = z.infer<typeof usageAuthorizationsByTransactionPathParamsSchema>;

 export const usageAuthorizationsByTransactionQueryParamsSchema = z.object({ "actor": z.coerce.string().optional(), "permission": z.coerce.string().optional(), "action_index": z.coerce.number().optional(), "order_by": z.enum(["action_index,index", "action_index", "index"]).default("action_index,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageAuthorizationsByTransactionQueryParamsSchema = z.infer<typeof usageAuthorizationsByTransactionQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsByTransaction200Schema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageAuthorizationsByTransaction200Schema = z.infer<typeof usageAuthorizationsByTransaction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageAuthorizationsByTransactionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageAuthorizationsByTransactionErrorSchema = z.infer<typeof usageAuthorizationsByTransactionErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageAuthorizationsByTransactionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsAuthorizationsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageAuthorizationsByTransactionQueryResponseSchema = z.infer<typeof usageAuthorizationsByTransactionQueryResponseSchema>;


export const usageBlocksByDatePathParamsSchema = z.object({ "date": z.string().date() });
export type UsageBlocksByDatePathParamsSchema = z.infer<typeof usageBlocksByDatePathParamsSchema>;

 export const usageBlocksByDateQueryParamsSchema = z.object({ "order_by": z.enum(["number"]).default("number").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageBlocksByDateQueryParamsSchema = z.infer<typeof usageBlocksByDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageBlocksByDate200Schema = z.infer<typeof usageBlocksByDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksByDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksByDateErrorSchema = z.infer<typeof usageBlocksByDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageBlocksByDateQueryResponseSchema = z.infer<typeof usageBlocksByDateQueryResponseSchema>;


export const usageBlocksByHashPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageBlocksByHashPathParamsSchema = z.infer<typeof usageBlocksByHashPathParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByHash200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageBlocksByHash200Schema = z.infer<typeof usageBlocksByHash200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksByHashErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksByHashErrorSchema = z.infer<typeof usageBlocksByHashErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByHashQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageBlocksByHashQueryResponseSchema = z.infer<typeof usageBlocksByHashQueryResponseSchema>;


export const usageBlocksByNumberPathParamsSchema = z.object({ "number": z.coerce.number() });
export type UsageBlocksByNumberPathParamsSchema = z.infer<typeof usageBlocksByNumberPathParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageBlocksByNumber200Schema = z.infer<typeof usageBlocksByNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageBlocksByNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageBlocksByNumberErrorSchema = z.infer<typeof usageBlocksByNumberErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageBlocksByNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsBlocksSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageBlocksByNumberQueryResponseSchema = z.infer<typeof usageBlocksByNumberQueryResponseSchema>;


export const usageDbOpsByDatePathParamsSchema = z.object({ "block_date": z.string().date() });
export type UsageDbOpsByDatePathParamsSchema = z.infer<typeof usageDbOpsByDatePathParamsSchema>;

 export const usageDbOpsByDateQueryParamsSchema = z.object({ "code": z.coerce.string().optional(), "table_name": z.coerce.string().optional(), "scope": z.coerce.string().optional(), "primary_key": z.coerce.string().optional(), "order_by": z.enum(["block_number,index", "block_number"]).default("block_number,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageDbOpsByDateQueryParamsSchema = z.infer<typeof usageDbOpsByDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsByDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageDbOpsByDate200Schema = z.infer<typeof usageDbOpsByDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbOpsByDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbOpsByDateErrorSchema = z.infer<typeof usageDbOpsByDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsByDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageDbOpsByDateQueryResponseSchema = z.infer<typeof usageDbOpsByDateQueryResponseSchema>;


export const usageDbOpsByBlockPathParamsSchema = z.object({ "block_number": z.coerce.number() });
export type UsageDbOpsByBlockPathParamsSchema = z.infer<typeof usageDbOpsByBlockPathParamsSchema>;

 export const usageDbOpsByBlockQueryParamsSchema = z.object({ "code": z.coerce.string().optional(), "table_name": z.coerce.string().optional(), "scope": z.coerce.string().optional(), "primary_key": z.coerce.string().optional(), "order_by": z.enum(["index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageDbOpsByBlockQueryParamsSchema = z.infer<typeof usageDbOpsByBlockQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsByBlock200Schema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageDbOpsByBlock200Schema = z.infer<typeof usageDbOpsByBlock200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbOpsByBlockErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbOpsByBlockErrorSchema = z.infer<typeof usageDbOpsByBlockErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsByBlockQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageDbOpsByBlockQueryResponseSchema = z.infer<typeof usageDbOpsByBlockQueryResponseSchema>;


export const usageDbOpsByTransactionPathParamsSchema = z.object({ "tx_hash": z.coerce.string() });
export type UsageDbOpsByTransactionPathParamsSchema = z.infer<typeof usageDbOpsByTransactionPathParamsSchema>;

 export const usageDbOpsByTransactionQueryParamsSchema = z.object({ "code": z.coerce.string().optional(), "table_name": z.coerce.string().optional(), "scope": z.coerce.string().optional(), "primary_key": z.coerce.string().optional(), "order_by": z.enum(["index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageDbOpsByTransactionQueryParamsSchema = z.infer<typeof usageDbOpsByTransactionQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsByTransaction200Schema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageDbOpsByTransaction200Schema = z.infer<typeof usageDbOpsByTransaction200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageDbOpsByTransactionErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageDbOpsByTransactionErrorSchema = z.infer<typeof usageDbOpsByTransactionErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageDbOpsByTransactionQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsDbOpsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageDbOpsByTransactionQueryResponseSchema = z.infer<typeof usageDbOpsByTransactionQueryResponseSchema>;

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

 export const usageTransactionsByBlockDateQueryParamsSchema = z.object({ "order_by": z.enum(["block_number,index", "block_number"]).default("block_number,index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageTransactionsByBlockDateQueryParamsSchema = z.infer<typeof usageTransactionsByBlockDateQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockDate200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageTransactionsByBlockDate200Schema = z.infer<typeof usageTransactionsByBlockDate200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsByBlockDateErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsByBlockDateErrorSchema = z.infer<typeof usageTransactionsByBlockDateErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockDateQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageTransactionsByBlockDateQueryResponseSchema = z.infer<typeof usageTransactionsByBlockDateQueryResponseSchema>;


export const usageTransactionsByBlockNumberPathParamsSchema = z.object({ "block_number": z.coerce.number() });
export type UsageTransactionsByBlockNumberPathParamsSchema = z.infer<typeof usageTransactionsByBlockNumberPathParamsSchema>;

 export const usageTransactionsByBlockNumberQueryParamsSchema = z.object({ "order_by": z.enum(["index"]).default("index").optional(), "order_direction": z.enum(["asc", "desc"]).default("asc").optional(), "first": z.coerce.number().optional(), "skip": z.coerce.number().optional() }).optional();
export type UsageTransactionsByBlockNumberQueryParamsSchema = z.infer<typeof usageTransactionsByBlockNumberQueryParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockNumber200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageTransactionsByBlockNumber200Schema = z.infer<typeof usageTransactionsByBlockNumber200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsByBlockNumberErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsByBlockNumberErrorSchema = z.infer<typeof usageTransactionsByBlockNumberErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByBlockNumberQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageTransactionsByBlockNumberQueryResponseSchema = z.infer<typeof usageTransactionsByBlockNumberQueryResponseSchema>;


export const usageTransactionsByHashPathParamsSchema = z.object({ "hash": z.coerce.string() });
export type UsageTransactionsByHashPathParamsSchema = z.infer<typeof usageTransactionsByHashPathParamsSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByHash200Schema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
export type UsageTransactionsByHash200Schema = z.infer<typeof usageTransactionsByHash200Schema>;
/**
 * @description An unexpected error response.
 */
export const usageTransactionsByHashErrorSchema = z.lazy(() => apiErrorSchema);
export type UsageTransactionsByHashErrorSchema = z.infer<typeof usageTransactionsByHashErrorSchema>;
/**
 * @description The request has succeeded.
 */
export const usageTransactionsByHashQueryResponseSchema = z.object({ "data": z.array(z.lazy(() => modelsTransactionsSchema)), "statistics": z.object({ "elapsed": z.coerce.number(), "rows_read": z.coerce.number(), "bytes_read": z.coerce.number() }), "rows": z.coerce.number(), "rows_before_limit_at_least": z.coerce.number() });
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

 export const operations = { "Usage_actionsByDate": {
        request: undefined,
        parameters: {
            path: usageActionsByDatePathParamsSchema,
            query: usageActionsByDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsByDateQueryResponseSchema,
            default: usageActionsByDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_actionsByBlock": {
        request: undefined,
        parameters: {
            path: usageActionsByBlockPathParamsSchema,
            query: usageActionsByBlockQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageActionsByBlockQueryResponseSchema,
            default: usageActionsByBlockQueryResponseSchema
        },
        errors: {}
    }, "Usage_actionsByTransaction": {
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
    }, "Usage_authorizationsByDate": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsByDatePathParamsSchema,
            query: usageAuthorizationsByDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsByDateQueryResponseSchema,
            default: usageAuthorizationsByDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsByBlock": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsByBlockPathParamsSchema,
            query: usageAuthorizationsByBlockQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsByBlockQueryResponseSchema,
            default: usageAuthorizationsByBlockQueryResponseSchema
        },
        errors: {}
    }, "Usage_authorizationsByTransaction": {
        request: undefined,
        parameters: {
            path: usageAuthorizationsByTransactionPathParamsSchema,
            query: usageAuthorizationsByTransactionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageAuthorizationsByTransactionQueryResponseSchema,
            default: usageAuthorizationsByTransactionQueryResponseSchema
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
    }, "Usage_dbOpsByDate": {
        request: undefined,
        parameters: {
            path: usageDbOpsByDatePathParamsSchema,
            query: usageDbOpsByDateQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbOpsByDateQueryResponseSchema,
            default: usageDbOpsByDateQueryResponseSchema
        },
        errors: {}
    }, "Usage_dbOpsByBlock": {
        request: undefined,
        parameters: {
            path: usageDbOpsByBlockPathParamsSchema,
            query: usageDbOpsByBlockQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbOpsByBlockQueryResponseSchema,
            default: usageDbOpsByBlockQueryResponseSchema
        },
        errors: {}
    }, "Usage_dbOpsByTransaction": {
        request: undefined,
        parameters: {
            path: usageDbOpsByTransactionPathParamsSchema,
            query: usageDbOpsByTransactionQueryParamsSchema,
            header: undefined
        },
        responses: {
            200: usageDbOpsByTransactionQueryResponseSchema,
            default: usageDbOpsByTransactionQueryResponseSchema
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
export const paths = { "/actions/block_date/{block_date}": {
        get: operations["Usage_actionsByDate"]
    }, "/actions/block_number/{block_number}": {
        get: operations["Usage_actionsByBlock"]
    }, "/actions/tx_hash/{tx_hash}": {
        get: operations["Usage_actionsByTransaction"]
    }, "/authorizations/block_date/{block_date}": {
        get: operations["Usage_authorizationsByDate"]
    }, "/authorizations/block_number/{block_number}": {
        get: operations["Usage_authorizationsByBlock"]
    }, "/authorizations/tx_hash/{tx_hash}": {
        get: operations["Usage_authorizationsByTransaction"]
    }, "/blocks/date/{date}": {
        get: operations["Usage_blocksByDate"]
    }, "/blocks/hash/{hash}": {
        get: operations["Usage_blocksByHash"]
    }, "/blocks/number/{number}": {
        get: operations["Usage_blocksByNumber"]
    }, "/db_ops/block_date/{block_date}": {
        get: operations["Usage_dbOpsByDate"]
    }, "/db_ops/block_number/{block_number}": {
        get: operations["Usage_dbOpsByBlock"]
    }, "/db_ops/tx_hash/{tx_hash}": {
        get: operations["Usage_dbOpsByTransaction"]
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