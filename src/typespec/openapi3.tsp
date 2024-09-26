import "@typespec/http";
import "@typespec/openapi";
import "./models.tsp";

using TypeSpec.Http;
using TypeSpec.OpenAPI;

@service({
    title: "Antelope Transactions Api",
})
@info({
    summary: "Transactions information from the Antelope blockchains, powered by Substreams",
    license: {
        name: "MIT",
        url: "https://github.com/pinax-network/antelope-transactions-api/blob/75db1c61477ac7ea5e56f775cefe54875af953d4/LICENSE",
    },
    version: "0.3.3",
}) // From @typespec/openapi
//@server("https://eos.api.pinax.network/v1", "EOS V1 Api Endpoint")
namespace AntelopeTransactionsApi;

alias ApiKeyHeader = "X-Api-Key";
// Error codes adapted from https://github.com/pinax-network/golang-base/blob/develop/response/errors.go
alias ApiErrorCode =
    | "bad_database_response" // invalid response from the database
    | "bad_header" // invalid or malformed header given
    | "missing_required_header" // request is missing a header
    | "bad_query_input" // given query input is missing or malformed
    | "database_timeout" // timeout while connecting to database
    | "forbidden" // not allowed to access this endpoint
    | "internal_server_error" // an unknown error occurred on the backend
    | "method_not_allowed" // http method is not allowed on this endpoint
    | "route_not_found" // the requested route was not found
    | "unauthorized" // invalid authorization information given
    | "not_found_data"; // no data found for the given query

alias ErrorStatusCode = 500 | 504 | 400 | 401 | 403 | 404 | 405;

@error
model ApiError {
    status: ErrorStatusCode;
    code: ApiErrorCode;
    message: string;
}
model UsageResponse<T> {
    data: T[];
    statistics: {
        elapsed: float;
        rows_read: safeint;
        bytes_read: safeint;
    };
    rows: safeint;
    rows_before_limit_at_least: safeint;
    // meta: {
    //     name: string;
    //     type: string;
    // }[];
}

// Alias will *not* be present in the OpenAPI components.
// This also helps preventing self-references in generated `components` for codegen to work properly.
alias ApiResponse<T> = T | ApiError;

alias PaginationFilters = {
    @query first?: safeint = 20;
    @query skip?: safeint = 0;
};

alias OrderDirection = {
    @query order_direction?: "asc" | "desc" = "asc";
};

alias BlockNumberFilters = {
    @query block_number?: safeint;
    @query block_date?: plainDate;
};

alias Filters = {
    ...PaginationFilters;
    ...BlockNumberFilters;
};

alias DbOpsFilters = {
    @query code?: Models.DbOps.code;
    @query table_name?: Models.DbOps.table_name;
    @query scope?: Models.DbOps.scope;
    @query primary_key?: Models.DbOps.primary_key;
};

alias ActionsFilters = {
    @query account?: Models.Actions.account;
    @query name?: Models.Actions.name;
    @query receiver?: Models.Actions.receiver;
};

alias AuthorizationsFilters = {
    @query actor?: Models.Authorizations.actor;
    @query permission?: Models.Authorizations.permission;
    @query action_index?: Models.Authorizations.action_index;
};

alias OrderByBlockIndex = {
    @query
    order_by?: "block_number,index" | "block_number" = "block_number,index";
};

alias OrderByIndex = {
    @query order_by?: "index" = "index";
};

alias OrderByActionIndex = {
    @query
    order_by?: "action_index,index" | "action_index" | "index" = "action_index,index";
};

alias OrderByBlockActionIndex = {
    @query
    order_by?:
        | "block_number,action_index,index"
        | "block_number"
        | "action_index"
        | "index" = "block_number,action_index,index";
};

@tag("Usage") // Important: all endpoints querying the ClickHouse backend must be under this tagged interface
interface Usage {
    // ===========================================================
    // Blocks
    // ===========================================================
    @tag("Blocks")
    @summary("Blocks by number")
    @route("/blocks/number/{number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksByNumber(
        @path number: Models.Blocks.number,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    @tag("Blocks")
    @summary("Blocks by hash")
    @route("/blocks/hash/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksByHash(
        @path hash: Models.Blocks.hash,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    @tag("Blocks")
    @summary("Blocks by date")
    @route("/blocks/date/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksByDate(
        @path date: Models.Blocks.date,
        @query order_by?: "number" = "number",
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    // ===========================================================
    // Transactions
    // ===========================================================
    @tag("Transactions")
    @summary("Transactions by hash")
    @route("/transactions/hash/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    transactionsByHash(
        @path hash: Models.Transactions.hash,
    ): ApiResponse<UsageResponse<Models.Transactions>>;

    @tag("Transactions")
    @summary("Transactions by block")
    @route("/transactions/block_number/{block_number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    transactionsByBlockNumber(
        @path block_number: Models.Transactions.block_number,
        ...OrderByIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Transactions>>;

    @tag("Transactions")
    @summary("Transactions by date")
    @route("/transactions/block_date/{block_date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    transactionsByBlockDate(
        @path block_date: Models.Transactions.block_date,
        ...OrderByBlockIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Transactions>>;

    // ===========================================================
    // Actions
    // ===========================================================
    @tag("Actions")
    @summary("Actions by transaction")
    @route("/actions/tx_hash/{tx_hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsByTransaction(
        @path tx_hash: Models.Actions.tx_hash,
        ...ActionsFilters,
        ...OrderByIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    @tag("Actions")
    @summary("Actions by block")
    @route("/actions/block_number/{block_number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsByBlock(
        @path block_number: Models.Actions.block_number,
        ...ActionsFilters,
        ...OrderByBlockIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    @tag("Actions")
    @summary("Actions by date")
    @route("/actions/block_date/{block_date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsByDate(
        @path block_date: Models.Actions.block_date,
        ...ActionsFilters,
        ...OrderByBlockIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    // ===========================================================
    // Database Operations
    // ===========================================================
    @tag("Database Operations")
    @summary("Database operations by transaction")
    @route("/db_ops/tx_hash/{tx_hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    dbOpsByTransaction(
        @path tx_hash: Models.DbOps.tx_hash,
        ...DbOpsFilters,
        ...OrderByIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.DbOps>>;

    @tag("Database Operations")
    @summary("Database operations by block")
    @route("/db_ops/block_number/{block_number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    dbOpsByBlock(
        @path block_number: Models.DbOps.block_number,
        ...DbOpsFilters,
        ...OrderByIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.DbOps>>;

    @tag("Database Operations")
    @summary("Database operations by date")
    @route("/db_ops/block_date/{block_date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    dbOpsByDate(
        @path block_date: Models.DbOps.block_date,
        ...DbOpsFilters,
        ...OrderByBlockIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.DbOps>>;

    // ===========================================================
    // Authorizations
    // ===========================================================
    @tag("Authorizations")
    @summary("Authorizations by transaction")
    @route("/authorizations/tx_hash/{tx_hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsByTransaction(
        @path tx_hash: Models.Authorizations.tx_hash,
        ...AuthorizationsFilters,
        ...OrderByActionIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    @tag("Authorizations")
    @summary("Authorizations by block")
    @route("/authorizations/block_number/{block_number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsByBlock(
        @path block_number: Models.Authorizations.block_number,
        ...AuthorizationsFilters,
        ...OrderByBlockActionIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    @tag("Authorizations")
    @summary("Authorizations by date")
    @route("/authorizations/block_date/{block_date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsByDate(
        @path block_date: Models.Authorizations.block_date,
        ...AuthorizationsFilters,
        ...OrderByBlockActionIndex,
        ...OrderDirection,
        ...PaginationFilters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;
}

model Version {
    @pattern("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$") // Adapted from https://semver.org/
    version: string;

    @pattern("^[0-9a-f]{7}$")
    commit: string;
}

@tag("Docs")
interface Docs {
    /**
        Reflection endpoint to return OpenAPI JSON spec. Also used by Swagger to generate the frontpage.
        @returns The OpenAPI JSON spec
    */
    @summary("OpenAPI JSON spec")
    @route("/openapi")
    @get
    openapi(): ApiResponse<Record<unknown>>;

    /**
        Api version and Git short commit hash.
        @returns The Api version and commit hash.
    */
    @summary("Api version")
    @route("/version")
    @get
    version(): ApiResponse<Version>;
}

@tag("Monitoring")
interface Monitoring {
    /**
        Checks database connection.
        @returns OK or ApiError.
    */
    @summary("Health check")
    @route("/health")
    @get
    health(): ApiResponse<string>;

    /**
        Prometheus metrics.
        @returns Metrics as text.
    */
    @summary("Prometheus metrics")
    @route("/metrics")
    @get
    metrics(): ApiResponse<string>;
}
