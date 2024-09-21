/**
 * Common models used for protobuf and openapi3 outputs
 */
namespace Models {
    model BlockClock {
        time: utcDateTime;
        number: uint64;
        hash: string;
        date: plainDate;
    }
    model Clock {
        block_time: utcDateTime;
        block_number: uint64;
        block_hash: string;
        block_date: plainDate;
    }
    model TransactionMetadata {
        tx_hash: string;
        tx_success: boolean;
    }
    model ActionMetadata {
        action_index: uint32;
    }

    model Blocks {
        ...BlockClock;

        // Header
        previous: string; // 'Hash'

        producer: string; // 'Address'
        confirmed: uint32;
        schedule_version: uint32;

        // Block
        version: uint32;

        producer_signature: string; // 'Signature'
        dpos_proposed_irreversible_blocknum: uint32;
        dpos_irreversible_blocknum: uint32;

        // Block roots
        transaction_mroot: string; // 'Hash'

        action_mroot: string; // 'Hash'
        blockroot_merkle_node_count: uint32;

        // Counters
        size: uint64; // 'Block size estimate in bytes'

        total_transactions: uint64;
        successful_transactions: uint64;
        failed_transactions: uint64;
        total_actions: uint64;
        total_db_ops: uint64;
    }

    model Transactions {
        ...Clock;

        // Transaction
        hash: string; // 'Hash'

        index: uint64;
        elapsed: int64;
        net_usage: uint64;
        scheduled: boolean;

        // Header
        cpu_usage_micro_seconds: uint32;

        net_usage_words: uint32;
        status: string; // 'Status'
        status_code: uint8;
        success: boolean;

        // Block roots
        transaction_mroot: string; // 'Hash'
    }

    model Actions {
        ...Clock;
        ...TransactionMetadata;

        // Receipt
        abi_sequence: uint64;

        code_sequence: uint64;
        digest: string;
        global_sequence: uint64;
        receipt_receiver: string; // 'Address'
        recv_sequence: uint64;

        // Action
        account: string; // 'Address'

        name: string; // 'Address'
        json_data: string; // 'JSON'
        raw_data: string; // 'Hex'

        // Trace
        index: uint32;

        action_ordinal: uint32;
        receiver: string;
        context_free: boolean;
        elapsed: int64;
        console: string;
        raw_return_value: string;
        json_return_value: string;
        creator_action_ordinal: uint32;
        closest_unnotified_ancestor_action_ordinal: uint32;

        // Block roots
        action_mroot: string; // 'Hash'
    }

    model Authorizations {
        ...Clock;
        ...TransactionMetadata;
        ...ActionMetadata;
        index: uint32;
        actor: string;
        permission: string;
    }

    model DbOps {
        ...Clock;
        ...TransactionMetadata;
        ...ActionMetadata;
        index: uint32;
        operation: string;
        operation_code: uint8;
        code: string;
        scope: string;
        table_name: string;
        primary_key: string;
        old_payer: string;
        new_payer: string;
        old_data: string;
        new_data: string;
        old_data_json: string;
        new_data_json: string;
    }
}
