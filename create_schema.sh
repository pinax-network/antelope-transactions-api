#!/usr/bin/env bash

# Helper script for generating the `schema.sql` ClickHouse tables definition
# Specify a cluster name to add `ON CLUSTER` directives

show_usage() {
    printf 'Usage: %s [(-o|--outfile) file (default: "schema.sql")] [(-c|--cluster) name (default: none)] [(-h|--help)]\n' "$(basename "$0")"
    exit 0
}

SCHEMA_FILE="./schema.sql"
CLUSTER_NAME=""
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -o|--outfile) SCHEMA_FILE="$2"; shift ;;
        -c|--cluster) CLUSTER_NAME="$2"; shift ;;
        -h|--help) show_usage ;;
        *) echo "Unknown parameter passed: $1"; show_usage; exit 1 ;;
    esac
    shift
done

ON_CLUSTER_DIRECTIVE=""
ENGINE_DEFAULT="ReplacingMergeTree()"
ENGINE_VER="ReplacingMergeTree(ver)"
ENGINE_VER_DELETE="ReplacingMergeTree(ver, has_null_balance)"
if [ -n "$CLUSTER_NAME" ]; then
    ON_CLUSTER_DIRECTIVE="ON CLUSTER \"$CLUSTER_NAME\""
    ENGINE_DEFAULT="ReplicatedReplacingMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}')"
    ENGINE_VER="ReplicatedReplacingMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}', ver)"
    ENGINE_VER_DELETE="ReplicatedReplacingMergeTree('/clickhouse/tables/{uuid}/{shard}', '{replica}', ver, has_null_balance)"
fi

cat > $SCHEMA_FILE <<- EOM
--------------------------------------
-- AUTO-GENERATED FILE, DO NOT EDIT --
--------------------------------------
-- This SQL file creates the required tables for a single Antelope chain.
-- You can use the ClickHouse client command to execute it:
-- $ cat schema.sql | clickhouse client -h <host> --port 9000 -d <database> -u <user> --password <password>

-------------------------------------------------
-- Meta tables to store Substreams information --
-------------------------------------------------
CREATE TABLE IF NOT EXISTS cursors $ON_CLUSTER_DIRECTIVE
(
    id        String,
    cursor    String,
    block_num Int64,
    block_id  String
)
    ENGINE = $ENGINE_DEFAULT
        PRIMARY KEY (id)
        ORDER BY (id);

CREATE TABLE IF NOT EXISTS blocks $ON_CLUSTER_DIRECTIVE
(
    -- clock --
    block_time                              DateTime64(3, 'UTC'),
    block_number                            UInt64,
    block_date                              Date,
    block_hash                              String,

    -- header --
    previous                                String,
    producer                                String,
    confirmed                               UInt32,
    schedule_version                        UInt32,

    -- clock --
    version                                 UInt32,
    producer_signature                      String COMMENT 'Signature',
    dpos_proposed_irreversible_blocknum     UInt32,
    dpos_irreversible_blocknum              UInt32,

    -- block roots --
    transaction_mroot                       String,
    action_mroot                            String,
    -- blockroot_merkle_active_nodes           Array(String) COMMENT 'A blockroot Merkle tree uses hashes to verify blockchain data integrity. Leaf nodes hash data blocks, non-leaf nodes hash child nodes. The root hash efficiently verifies all data.',
    blockroot_merkle_node_count             UInt32,

    -- counters --
    size                                    UInt64 COMMENT 'Block size estimate in bytes',
    total_transactions                      UInt64,
    successful_transactions                 UInt64,
    failed_transactions                     UInt64,
    total_actions                           UInt64,
    total_db_ops                            UInt64,
)
    ENGINE = $ENGINE_DEFAULT
        PRIMARY KEY (block_date, block_number)
        ORDER BY (block_date, block_number, block_hash)
        COMMENT 'Antelope block header';

CREATE TABLE IF NOT EXISTS transactions $ON_CLUSTER_DIRECTIVE
(
    -- clock --
    block_time                  DateTime64(3, 'UTC'),
    block_number                UInt64,
    block_hash                  String,
    block_date                  Date,

    -- transaction --
    hash                        String,
    \`index\`                     UInt64,
    elapsed                     Int64,
    net_usage                   UInt64,
    scheduled                   Bool,

    -- header --
    cpu_usage_micro_seconds     UInt32,
    net_usage_words             UInt32,
    status                      LowCardinality(String) COMMENT 'Status',
    status_code                 UInt8,
    success                     Bool,

    -- block roots --
    transaction_mroot           String,
)
    ENGINE = $ENGINE_DEFAULT
        PRIMARY KEY (block_date, block_number)
        ORDER BY (block_date, block_number, block_hash, hash)
        COMMENT 'Antelope transactions';

CREATE TABLE IF NOT EXISTS actions $ON_CLUSTER_DIRECTIVE
(
    -- clock --
    block_time                  DateTime64(3, 'UTC'),
    block_number                UInt64,
    block_hash                  String,
    block_date                  Date,

    -- transaction --
    tx_hash                     String,
    tx_index                    UInt64,
    tx_status                   LowCardinality(String),
    tx_status_code              UInt8,
    tx_success                  Bool,

    -- receipt --
    abi_sequence                UInt64,
    code_sequence               UInt64,
    digest                      String,
    global_sequence             UInt64,
    receipt_receiver            String,
    recv_sequence               UInt64,

    -- action --
    account                     String,
    name                        String,
    json_data                   String COMMENT 'JSON',
    raw_data                    String COMMENT 'Hex',

    -- trace --
    action_ordinal                                  UInt32 COMMENT 'Action Ordinal',
    receiver                                        String,
    context_free                                    Bool,
    elapsed                                         Int64,
    console                                         String,
    raw_return_value                                String,
    json_return_value                               String,
    creator_action_ordinal                          UInt32,
    closest_unnotified_ancestor_action_ordinal      UInt32,
    execution_index                                 UInt32,

    -- block roots --
    action_mroot                                    String,
)
    ENGINE = $ENGINE_DEFAULT
        PRIMARY KEY (block_date, block_number)
        ORDER BY (block_date, block_number, block_hash, tx_hash, tx_index, action_ordinal)
        COMMENT 'Antelope actions';

CREATE TABLE IF NOT EXISTS receivers $ON_CLUSTER_DIRECTIVE
(
    -- clock --
    block_time                  DateTime64(3, 'UTC'),
    block_number                UInt64,
    block_hash                  String,
    block_date                  Date,

    -- transaction --
    tx_hash                 String,

    -- action --
    action_ordinal          UInt32,
    receiver                String
)
    ENGINE = $ENGINE_DEFAULT
        PRIMARY KEY (block_date, block_number)
        ORDER BY (block_date, block_number, block_hash, tx_hash, action_ordinal, receiver)
        COMMENT 'Antelope action receivers';

CREATE TABLE IF NOT EXISTS authorizations $ON_CLUSTER_DIRECTIVE
(
    -- clock --
    block_time                  DateTime64(3, 'UTC'),
    block_number                UInt64,
    block_hash                  String,
    block_date                  Date,

    -- transaction --
    tx_hash                 String,

    -- action --
    action_ordinal          UInt32,
    actor                   String,
    permission              LowCardinality(String)
)
    ENGINE = $ENGINE_DEFAULT
        PRIMARY KEY (block_date, block_number)
        ORDER BY (block_date, block_number, block_hash, tx_hash, action_ordinal, actor, permission)
        COMMENT 'Antelope action authorizations';
EOM

echo "[+] Created '$SCHEMA_FILE'"
echo "[*] Run the following command to apply:"
echo "cat $SCHEMA_FILE | clickhouse client -h <host> --port 9000 -d <database> -u <user> --password <password>"
