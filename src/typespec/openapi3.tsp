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
    status: ErrorStatusCode;
    code: ApiErrorCode;
    message: string;
}

model QueryStatistics {
    elapsed: float;
    rows_read: safeint;
    bytes_read: safeint;
}

model Pagination {
    next_page: safeint;
    previous_page: safeint;
    total_pages: safeint;
    total_results: safeint;
}

model ResponseMetadata {
    statistics: QueryStatistics | null;
    ...Pagination;
}

model UsageResponse<T> {
    data: T[];
    meta: ResponseMetadata;
}

// Alias will *not* be present in the OpenAPI components.
// This also helps preventing self-references in generated `components` for codegen to work properly.
alias ApiResponse<T> = T | ApiError;
alias PaginationQueryParams = {
    @query limit?: uint64 = 10;
    @query page?: uint64 = 1;
};

@tag("Usage")
interface Usage {
    /**
        Block by hash.
        @returns Array of blocks.
    */
    @summary("Blocks")
    @route("/blocks/{hash}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksHash(
        @path hash: Models.Blocks.block_hash,
        ...PaginationQueryParams,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    /**
        Block by number.
        @returns Array of blocks.
    */
    @summary("Blocks")
    @route("/blocks/{number}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksNumber(
        @path number: Models.Blocks.block_number,
        ...PaginationQueryParams,
    ): ApiResponse<UsageResponse<Models.Blocks>>;

    /**
        Block by date.
        @returns Array of blocks.
    */
    @summary("Blocks")
    @route("/blocks/{date}")
    @get
    @useAuth(ApiKeyAuth<ApiKeyLocation.header, ApiKeyHeader>)
    blocksDate(
        @path date: Models.Blocks.block_date,
        ...PaginationQueryParams,
    ): ApiResponse<UsageResponse<Models.Blocks>>;
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
