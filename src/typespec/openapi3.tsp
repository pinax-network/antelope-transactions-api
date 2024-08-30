import "@typespec/http";
import "@typespec/openapi";
import "./models.tsp";

using TypeSpec.Http;
using TypeSpec.OpenAPI;

@service({ title: "Antelope Transactions Api" })
@info({
    summary: "Transactions information from the Antelope blockchains, powered by Substreams",
    license: {
        name: "MIT",
        url: "https://github.com/pinax-network/antelope-transactions-api/blob/75db1c61477ac7ea5e56f775cefe54875af953d4/LICENSE"
    },
    version: "0.1.0"
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
    | "unauthorized"; // invalid authorization information given

alias ErrorStatusCode = 500 | 504 | 400 | 401 | 403 | 404 | 405;

@error
model ApiError {
    status: ErrorStatusCode,
    code: ApiErrorCode,
    message: string,
}

model QueryStatistics {
    elapsed: float,
    rows_read: safeint,
    bytes_read: safeint,
}

model ResponseMetadata {
    statistics: QueryStatistics | null,
    total_results: safeint,
}

model UsageResponse<T> {
    data: T[],
    meta: ResponseMetadata,
}

model SearchTransactions {
    ...Models.Transactions,
    actions: Models.Actions[],
    authorizations: {
        tx_hash: Models.Authorizations.tx_hash,
        action_ordinal: Models.Authorizations.action_ordinal,
        actor: Models.Authorizations.actor,
        permission: Models.Authorizations.permission,
    }[],
    receivers: {
        tx_hash: Models.Receivers.tx_hash,
        action_ordinal: Models.Receivers.action_ordinal,
        receiver: Models.Receivers.receiver,
    }[],
}

// Alias will *not* be present in the OpenAPI components.
// This also helps preventing self-references in generated `components` for codegen to work properly.
alias ApiResponse<T> = T | ApiError;
alias Filters = {
    @query first?: safeint = 10,
    @query skip?: safeint = 0,
    @query order_by?: "block_number" = "block_number",
    @query order_direction?: "asc" | "desc" = "desc",
};

@tag("Usage") // Important: all endpoints querying the ClickHouse backend must be under this tagged interface
interface Usage {
    @tag("Search")
    @summary("Search transactions")
    @route("/search/transactions")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    searchTransactions(
        @query account?: Models.Actions.account,
        @query action?: Models.Actions.name,
        @query auth?: Models.Authorizations.actor,
        @query hash?: Models.Transactions.hash,
        @query number?: Models.Transactions.block_number,
        @query receiver?: Models.Receivers.receiver,
        ...Filters,
    ): ApiResponse<UsageResponse<SearchTransactions>>;

    // ===========================================================
    // Blocks
    // ===========================================================

    /**
        Blocks by hash.
        @returns Array of blocks.
    */
    @tag("Blocks")
    @summary("Blocks by hash")
    @route("/blocks/hash/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksHash(
        @path hash: Models.Blocks.block_hash,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    /**
        Blocks by block number.
        @returns Array of blocks.
    */
    @tag("Blocks")
    @summary("Blocks by block number")
    @route("/blocks/number/{number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksNumber(
        @path number: Models.Blocks.block_number,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    /**
        Blocks by date.
        @returns Array of blocks.
    */
    @tag("Blocks")
    @summary("Blocks by date")
    @route("/blocks/date/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksDate(
        @path date: Models.Blocks.block_date,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    // ===========================================================
    // Transactions
    // ===========================================================

    /**
        Transactions by hash.
        @returns Array of transactions.
    */
    @tag("Transactions")
    @summary("Transactions by hash")
    @route("/transactions/hash/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    transactionsHash(
        @path hash: Models.Transactions.hash,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Transactions>>;

    /**
        Transactions by date.
        @returns Array of transactions.
    */
    @tag("Transactions")
    @summary("Transactions")
    @route("/transactions/date/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    transactionsDate(
        @path date: Models.Transactions.block_date,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Transactions>>;

    // ===========================================================
    // Actions
    // ===========================================================

    /**
        Actions by block number.
        @returns Array of actions.
    */
    @tag("Actions")
    @summary("Actions")
    @route("/actions/number/{number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsNumber(
        @path number: Models.Actions.block_number,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    /**
        Actions by name.
        @returns Array of actions.
    */
    @tag("Actions")
    @summary("Actions")
    @route("/actions/name/{name}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsName(
        @path name: Models.Actions.name,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    /**
        Actions by account.
        @returns Array of actions.
    */
    @tag("Actions")
    @summary("Actions")
    @route("/actions/account/{account}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsAccount(
        @path account: Models.Actions.account,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    /**
        Actions by date.
        @returns Array of actions.
    */
    @tag("Actions")
    @summary("Actions")
    @route("/actions/date/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    actionsDate(
        @path date: Models.Actions.block_date,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Actions>>;

    // ===========================================================
    // Receivers
    // ===========================================================

    /**
        Receivers by block number.
        @returns Array of receivers.
    */
    @tag("Receivers")
    @summary("Receivers by block number")
    @route("/receivers/number/{number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    receiversNumber(
        @path number: Models.Receivers.block_number,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Receivers>>;

    /**
        Receivers by date.
        @returns Array of receivers.
    */
    @tag("Receivers")
    @summary("Receivers by date")
    @route("/receivers/date/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    receiversDate(
        @path date: Models.Receivers.block_date,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Receivers>>;

    /**
        Receivers by transaction hash.
        @returns Array of receivers.
    */
    @tag("Receivers")
    @summary("Receivers by transaction hash")
    @route("/receivers/transaction/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    receiversTransaction(
        @path hash: Models.Receivers.tx_hash,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Receivers>>;

    /**
        Receivers by action ordinal.
        @returns Array of receivers.
    */
    @tag("Receivers")
    @summary("Receivers by action ordinal")
    @route("/receivers/action/{ordinal}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    receiversAction(
        @path ordinal: Models.Receivers.action_ordinal,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Receivers>>;

    /**
        Receivers by receiver.
        @returns Array of receivers.
    */
    @tag("Receivers")
    @summary("Receivers by receiver")
    @route("/receivers/receiver/{receiver}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    receiversReceiver(
        @path receiver: Models.Receivers.receiver,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Receivers>>;

    // ===========================================================
    // Authorizations
    // ===========================================================

    /**
        Authorizations by block number.
        @returns Array of authorizations.
    */
    @tag("Authorizations")
    @summary("Authorizations by block number")
    @route("/authorizations/number/{number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsNumber(
        @path number: Models.Authorizations.block_number,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    /**
        Authorizations by date.
        @returns Array of authorizations.
    */
    @tag("Authorizations")
    @summary("Authorizations by date")
    @route("/authorizations/date/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsDate(
        @path date: Models.Authorizations.block_date,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    /**
        Authorizations by transaction hash.
        @returns Array of authorizations.
    */
    @tag("Authorizations")
    @summary("Authorizations by transaction hash")
    @route("/authorizations/transaction/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsTransaction(
        @path hash: Models.Authorizations.tx_hash,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    /**
        Authorizations by action ordinal.
        @returns Array of authorizations.
    */
    @tag("Authorizations")
    @summary("Authorizations by action ordinal")
    @route("/authorizations/action/{ordinal}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsAction(
        @path ordinal: Models.Authorizations.action_ordinal,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    /**
        Authorizations by actor.
        @returns Array of authorizations.
    */
    @tag("Authorizations")
    @summary("Authorizations by actor")
    @route("/authorizations/actor/{actor}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsActor(
        @path actor: Models.Authorizations.actor,
        ...Filters,
    ): ApiResponse<UsageResponse<Models.Authorizations>>;

    /**
        Authorizations by permission.
        @returns Array of authorizations.
    */
    @tag("Authorizations")
    @summary("Authorizations by permission")
    @route("/authorizations/permission/{permission}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    authorizationsPermission(
        @path permission: Models.Authorizations.permission,
        ...Filters,
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
