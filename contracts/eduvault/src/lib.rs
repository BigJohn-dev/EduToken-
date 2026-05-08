#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, log, Address, Env, String, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ScholarshipPool {
    pub donor: Address,
    pub balance: i128,
    pub created_at: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Invoice {
    pub id: u32,
    pub school: Address,
    pub parent: Address,
    pub amount: i128,
    pub status: u32, // 0: pending, 1: paid, 2: released
    pub created_at: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ProofOfEnrollment {
    pub student_id: String,
    pub school: Address,
    pub parent: Address,
    pub issued_at: u64,
}

#[contract]
pub struct EduVault;

#[contractimpl]
impl EduVault {
    /// Deposit funds into a scholarship pool
    pub fn deposit_scholarship(env: Env, donor: Address, amount: i128) -> bool {
        donor.require_auth();

        log!(&env, "Scholarship deposit from {} of amount {}", donor, amount);

        if amount <= 0 {
            return false;
        }

        // Store scholarship pool (simplified - no token transfer in this MVP)
        let key = String::from_str(&env, "pool");
        let mut pool: ScholarshipPool = ScholarshipPool {
            donor: donor.clone(),
            balance: amount,
            created_at: env.ledger().timestamp(),
        };

        env.storage().instance().set(&key, &pool);
        true
    }

    /// Create an invoice for a parent to pay school fees
    pub fn create_invoice(
        env: Env,
        school: Address,
        parent: Address,
        amount: i128,
    ) -> u32 {
        school.require_auth();

        log!(&env, "Invoice created: school={}, parent={}, amount={}", school, parent, amount);

        let invoice_id: u32 = env.storage().instance().get(&String::from_str(&env, "next_invoice_id")).unwrap_or(1);

        let invoice = Invoice {
            id: invoice_id,
            school: school.clone(),
            parent: parent.clone(),
            amount,
            status: 0, // pending
            created_at: env.ledger().timestamp(),
        };

        let key = String::from_str(&env, &format!("invoice_{}", invoice_id));
        env.storage().instance().set(&key, &invoice);
        env.storage().instance().set(&String::from_str(&env, "next_invoice_id"), &(invoice_id + 1));

        invoice_id
    }

    /// Issue a Proof of Enrollment token (non-transferable receipt)
    pub fn issue_proof_of_enrollment(
        env: Env,
        school: Address,
        student_id: String,
        parent: Address,
    ) -> bool {
        school.require_auth();

        log!(&env, "Proof of Enrollment issued for student {}", student_id);

        let proof = ProofOfEnrollment {
            student_id: student_id.clone(),
            school: school.clone(),
            parent: parent.clone(),
            issued_at: env.ledger().timestamp(),
        };

        let key = String::from_str(&env, &format!("proof_{}", student_id));
        env.storage().instance().set(&key, &proof);

        true
    }

    /// Release scholarship funds upon proof of enrollment
    pub fn release_scholarship_funds(
        env: Env,
        donor: Address,
        school: Address,
        student_id: String,
        amount: i128,
    ) -> bool {
        donor.require_auth();

        log!(&env, "Releasing scholarship funds for student {} to school {}", student_id, school);

        // Check if proof of enrollment exists
        let proof_key = String::from_str(&env, &format!("proof_{}", student_id));
        let proof: Option<ProofOfEnrollment> = env.storage().instance().get(&proof_key);

        if proof.is_none() {
            return false;
        }

        // In a real implementation, transfer stablecoin to school
        // This is simplified for MVP
        true
    }

    /// Get invoice details
    pub fn get_invoice(env: Env, invoice_id: u32) -> Option<Invoice> {
        let key = String::from_str(&env, &format!("invoice_{}", invoice_id));
        env.storage().instance().get(&key)
    }

    /// Mark invoice as paid (by school for verification)
    pub fn mark_invoice_paid(env: Env, school: Address, invoice_id: u32) -> bool {
        school.require_auth();

        let key = String::from_str(&env, &format!("invoice_{}", invoice_id));
        let mut invoice: Invoice = match env.storage().instance().get(&key) {
            Some(inv) => inv,
            None => return false,
        };

        invoice.status = 1; // paid
        env.storage().instance().set(&key, &invoice);

        log!(&env, "Invoice {} marked as paid", invoice_id);
        true
    }
}
