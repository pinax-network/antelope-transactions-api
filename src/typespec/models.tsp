/**
 * Common models used for protobuf and openapi3 outputs
 */
namespace Models {
    model Clock {
        block_time: utcDateTime,
        block_number: uint64,
        block_hash: string, // 'EVM Hash'
        block_date: plainDate,
    }

    model Transaction {
        tx_hash: string, // 'Hash'
        tx_index: uint64,
        tx_status: string,
        tx_status_code: uint8,
        tx_success: boolean,
    }

    model Blocks {
        ...Clock,
        // Header
        parent_hash: string, // 'Hash'
        producer: string, // 'Address'
        confirmed: uint32,
        schedule_version: uint32,
        // Block
        version: uint32,
        producer_signature: string, // 'Signature'
        dpos_proposed_irreversible_blocknum: uint32,
        dpos_irreversible_blocknum: uint32,
        // Block roots
        transaction_mroot: string, // 'Hash'
        action_mroot: string, // 'Hash'
        blockroot_merkle_node_count: uint32,
        // Counters
        size: uint64, // 'Block size estimate in bytes'
        total_transactions: uint64,
        successful_transactions: uint64,
        failed_transactions: uint64,
        total_actions: uint64,
        total_db_ops: uint64,
    }

    model Transactions {
        ...Clock,
        // Transaction
        hash: string, // 'Hash'
        index: uint64,
        elapsed: int64,
        net_usage: uint64,
        scheduled: boolean,
        // Header
        cpu_usage_micro_seconds: uint32,
        net_usage_words: uint32,
        status: string, // 'Status'
        status_code: uint8,
        success: boolean,
        // Block roots
        transaction_mroot: string, // 'Hash'
    }


    model Actions {
        ...Clock,
        ...Transaction,
        // Receipt
        abi_sequence: uint64,
        code_sequence: uint64,
        digest: string,
        global_sequence: uint64,
        receipt_receiver: string, // 'Address'
        recv_sequence: uint64,
        // Action
        account: string, // 'Address'
        name: string, // 'Address'
        json_data: string, // 'JSON'
        raw_data: string, // 'Hex'
        // Trace
        index: uint32, // 'Action Ordinal'
        receiver: string,
        context_free: boolean,
        elapsed: int64,
        console: string,
        raw_return_value: string,
        json_return_value: string,
        creator_action_ordinal: uint32,
        closest_unnotified_ancestor_action_ordinal: uint32,
        execution_index: uint32,
        // Block roots
        action_mroot: string, // 'Hash'
    }

    model DBOps {
        ...Clock,
        ...Transaction,
        // Storage changes
        index: uint32,
        operation: string, // 'Operation'
        operation_code: uint8,
        action_index: uint32,
        code: string,
        scope: string,
        table_name: string,
        primary_key: string,
        old_payer: string,
        new_payer: string,
        old_data: string,
        new_data: string,
        old_data_json: string,
        new_data_json: string,
    }
}
