/*
  Warnings:

  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessMember" DROP CONSTRAINT "BusinessMember_businessId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessMember" DROP CONSTRAINT "BusinessMember_userId_fkey";

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "BusinessMember";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "BusinessRole";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "role_code" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" JSONB NOT NULL,
    "hierarchy_level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "business_type" TEXT NOT NULL,
    "industry_sector" TEXT,
    "business_description" TEXT,
    "registration_number" TEXT NOT NULL,
    "tax_identification_number" TEXT NOT NULL,
    "vat_number" TEXT,
    "incorporation_date" DATE,
    "incorporation_country" TEXT NOT NULL,
    "incorporation_state" TEXT,
    "primary_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state_province" TEXT,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "primary_phone" TEXT NOT NULL,
    "secondary_phone" TEXT,
    "primary_email" TEXT NOT NULL,
    "website_url" TEXT,
    "employee_count" INTEGER,
    "annual_revenue" DECIMAL(15,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "established_year" INTEGER,
    "primary_bank_name" TEXT,
    "primary_account_number" TEXT,
    "swift_code" TEXT,
    "iban" TEXT,
    "business_status" TEXT NOT NULL DEFAULT 'active',
    "verification_status" TEXT NOT NULL DEFAULT 'pending',
    "verification_date" TIMESTAMP(3),
    "verified_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "username" TEXT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "date_of_birth" DATE,
    "gender" TEXT,
    "nationality" TEXT,
    "personal_phone" TEXT,
    "work_phone" TEXT,
    "emergency_contact_name" TEXT,
    "emergency_contact_phone" TEXT,
    "home_address" TEXT,
    "home_city" TEXT,
    "home_state" TEXT,
    "home_postal_code" TEXT,
    "home_country" TEXT,
    "employee_id" TEXT,
    "job_title" TEXT,
    "department" TEXT,
    "hire_date" DATE,
    "salary" DECIMAL(12,2),
    "employment_type" TEXT,
    "reporting_manager_id" TEXT,
    "business_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "education_level" TEXT,
    "professional_certifications" TEXT[],
    "years_of_experience" INTEGER,
    "specialization_areas" TEXT[],
    "preferred_language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "notification_preferences" JSONB NOT NULL DEFAULT '{"email": true, "sms": false, "push": true}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "account_locked" BOOLEAN NOT NULL DEFAULT false,
    "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMP(3),
    "password_changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license_types" (
    "id" TEXT NOT NULL,
    "license_code" TEXT NOT NULL,
    "license_name" TEXT NOT NULL,
    "description" TEXT,
    "issuing_authority" TEXT,
    "validity_period_months" INTEGER,
    "is_mandatory" BOOLEAN NOT NULL DEFAULT false,
    "business_type_required" TEXT,
    "industry_specific" BOOLEAN NOT NULL DEFAULT false,
    "country_specific" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "license_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_licenses" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "license_type_id" TEXT NOT NULL,
    "license_number" TEXT NOT NULL,
    "license_name" TEXT,
    "issuing_authority" TEXT NOT NULL,
    "issuing_country" TEXT,
    "issuing_state" TEXT,
    "issue_date" DATE NOT NULL,
    "expiry_date" DATE,
    "is_permanent" BOOLEAN NOT NULL DEFAULT false,
    "renewal_required" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'active',
    "verification_status" TEXT NOT NULL DEFAULT 'pending',
    "document_file_path" TEXT,
    "document_file_name" TEXT,
    "document_size" INTEGER,
    "document_mime_type" TEXT,
    "document_hash" TEXT,
    "scope_of_work" TEXT,
    "conditions_restrictions" TEXT,
    "renewal_cost" DECIMAL(10,2),
    "renewal_currency" TEXT,
    "uploaded_by" TEXT,
    "verified_by" TEXT,
    "verified_at" TIMESTAMP(3),
    "last_verified_at" TIMESTAMP(3),
    "next_verification_due" DATE,
    "renewal_notification_sent" BOOLEAN NOT NULL DEFAULT false,
    "expiry_warning_sent" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_documents" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_category" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_number" TEXT,
    "issuing_authority" TEXT,
    "issue_date" DATE,
    "expiry_date" DATE,
    "file_path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_hash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_by" TEXT,
    "verified_at" TIMESTAMP(3),
    "verification_notes" TEXT,
    "is_confidential" BOOLEAN NOT NULL DEFAULT false,
    "access_level" TEXT NOT NULL DEFAULT 'user',
    "uploaded_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_documents" (
    "id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_category" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_description" TEXT,
    "document_version" TEXT NOT NULL DEFAULT '1.0',
    "file_path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_hash" TEXT,
    "effective_date" DATE,
    "expiry_date" DATE,
    "status" TEXT NOT NULL DEFAULT 'active',
    "confidentiality_level" TEXT NOT NULL DEFAULT 'internal',
    "access_roles" TEXT[],
    "uploaded_by" TEXT NOT NULL,
    "approved_by" TEXT,
    "approved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "can_create_tenders" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_own_tenders" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_all_tenders" BOOLEAN NOT NULL DEFAULT false,
    "can_delete_tenders" BOOLEAN NOT NULL DEFAULT false,
    "can_approve_tenders" BOOLEAN NOT NULL DEFAULT false,
    "can_publish_tenders" BOOLEAN NOT NULL DEFAULT false,
    "can_create_bids" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_own_bids" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_all_bids" BOOLEAN NOT NULL DEFAULT false,
    "can_submit_bids" BOOLEAN NOT NULL DEFAULT false,
    "can_withdraw_bids" BOOLEAN NOT NULL DEFAULT false,
    "can_evaluate_bids" BOOLEAN NOT NULL DEFAULT false,
    "can_view_evaluations" BOOLEAN NOT NULL DEFAULT false,
    "can_approve_evaluations" BOOLEAN NOT NULL DEFAULT false,
    "can_create_contracts" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_contracts" BOOLEAN NOT NULL DEFAULT false,
    "can_sign_contracts" BOOLEAN NOT NULL DEFAULT false,
    "can_approve_contracts" BOOLEAN NOT NULL DEFAULT false,
    "can_upload_documents" BOOLEAN NOT NULL DEFAULT false,
    "can_verify_documents" BOOLEAN NOT NULL DEFAULT false,
    "can_approve_licenses" BOOLEAN NOT NULL DEFAULT false,
    "can_create_users" BOOLEAN NOT NULL DEFAULT false,
    "can_edit_users" BOOLEAN NOT NULL DEFAULT false,
    "can_deactivate_users" BOOLEAN NOT NULL DEFAULT false,
    "can_view_all_users" BOOLEAN NOT NULL DEFAULT false,
    "can_view_reports" BOOLEAN NOT NULL DEFAULT false,
    "can_export_data" BOOLEAN NOT NULL DEFAULT false,
    "can_view_audit_logs" BOOLEAN NOT NULL DEFAULT false,
    "can_view_financial_data" BOOLEAN NOT NULL DEFAULT false,
    "can_approve_payments" BOOLEAN NOT NULL DEFAULT false,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "can_modify_permissions" BOOLEAN NOT NULL DEFAULT false,
    "granted_by" TEXT,
    "granted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "parent_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenders" (
    "id" TEXT NOT NULL,
    "tender_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category_id" TEXT,
    "business_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "tender_type" TEXT NOT NULL,
    "procurement_method" TEXT,
    "estimated_value" DECIMAL(15,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "publication_date" TIMESTAMP(3),
    "submission_deadline" TIMESTAMP(3) NOT NULL,
    "opening_date" TIMESTAMP(3),
    "evaluation_period" INTEGER,
    "award_date" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'draft',
    "minimum_requirements" TEXT,
    "evaluation_criteria" JSONB,
    "required_documents" JSONB,
    "contract_duration" INTEGER,
    "payment_terms" TEXT,
    "delivery_terms" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tender_items" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "item_number" TEXT,
    "description" TEXT NOT NULL,
    "quantity" DECIMAL(10,3),
    "unit" TEXT,
    "specifications" JSONB,
    "estimated_unit_price" DECIMAL(12,2),
    "is_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tender_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tender_documents" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_type" TEXT,
    "file_path" TEXT,
    "file_size" INTEGER,
    "mime_type" TEXT,
    "is_mandatory" BOOLEAN NOT NULL DEFAULT false,
    "uploaded_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "tender_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "bidder_id" TEXT NOT NULL,
    "submitted_by" TEXT NOT NULL,
    "bid_number" TEXT NOT NULL,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "validity_period" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "submission_date" TIMESTAMP(3),
    "technical_score" DECIMAL(5,2),
    "financial_score" DECIMAL(5,2),
    "total_score" DECIMAL(5,2),
    "is_compliant" BOOLEAN,
    "compliance_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bid_items" (
    "id" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,
    "tender_item_id" TEXT,
    "description" TEXT,
    "quantity" DECIMAL(10,3),
    "unit_price" DECIMAL(12,2),
    "total_price" DECIMAL(15,2),
    "specifications" JSONB,
    "delivery_time" INTEGER,
    "warranty_period" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bid_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bid_documents" (
    "id" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_type" TEXT,
    "file_path" TEXT,
    "file_size" INTEGER,
    "mime_type" TEXT,
    "uploaded_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "bid_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_criteria_list" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "criterion" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluation_criteria_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_committees" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "name" TEXT,
    "chairperson_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluation_committees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "committee_members" (
    "id" TEXT NOT NULL,
    "committee_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "committee_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,
    "evaluator_id" TEXT NOT NULL,
    "score" DECIMAL(5,2),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clarifications" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "asker_id" TEXT NOT NULL,
    "answerer_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answered_at" TIMESTAMP(3),

    CONSTRAINT "clarifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "tender_id" TEXT NOT NULL,
    "bid_id" TEXT NOT NULL,
    "contract_number" TEXT NOT NULL,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "businessId" TEXT,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_role_code_key" ON "user_roles"("role_code");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_registration_number_key" ON "businesses"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_tax_identification_number_key" ON "businesses"("tax_identification_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "license_types_license_code_key" ON "license_types"("license_code");

-- CreateIndex
CREATE UNIQUE INDEX "business_licenses_business_id_license_type_id_license_numbe_key" ON "business_licenses"("business_id", "license_type_id", "license_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_user_id_key" ON "user_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_code_key" ON "categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tenders_tender_number_key" ON "tenders"("tender_number");

-- CreateIndex
CREATE UNIQUE INDEX "bids_bid_number_key" ON "bids"("bid_number");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_contract_number_key" ON "contracts"("contract_number");

-- CreateIndex
CREATE INDEX "activity_logs_user_id_idx" ON "activity_logs"("user_id");

-- CreateIndex
CREATE INDEX "user_notifications_user_id_is_read_idx" ON "user_notifications"("user_id", "is_read");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_reporting_manager_id_fkey" FOREIGN KEY ("reporting_manager_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_licenses" ADD CONSTRAINT "business_licenses_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_licenses" ADD CONSTRAINT "business_licenses_license_type_id_fkey" FOREIGN KEY ("license_type_id") REFERENCES "license_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_licenses" ADD CONSTRAINT "business_licenses_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_licenses" ADD CONSTRAINT "business_licenses_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_granted_by_fkey" FOREIGN KEY ("granted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenders" ADD CONSTRAINT "tenders_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenders" ADD CONSTRAINT "tenders_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenders" ADD CONSTRAINT "tenders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tender_items" ADD CONSTRAINT "tender_items_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tender_documents" ADD CONSTRAINT "tender_documents_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tender_documents" ADD CONSTRAINT "tender_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tender_documents" ADD CONSTRAINT "tender_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_items" ADD CONSTRAINT "bid_items_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_items" ADD CONSTRAINT "bid_items_tender_item_id_fkey" FOREIGN KEY ("tender_item_id") REFERENCES "tender_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_documents" ADD CONSTRAINT "bid_documents_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_documents" ADD CONSTRAINT "bid_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bid_documents" ADD CONSTRAINT "bid_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_criteria_list" ADD CONSTRAINT "evaluation_criteria_list_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_committees" ADD CONSTRAINT "evaluation_committees_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_committees" ADD CONSTRAINT "evaluation_committees_chairperson_id_fkey" FOREIGN KEY ("chairperson_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_committee_id_fkey" FOREIGN KEY ("committee_id") REFERENCES "evaluation_committees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clarifications" ADD CONSTRAINT "clarifications_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clarifications" ADD CONSTRAINT "clarifications_asker_id_fkey" FOREIGN KEY ("asker_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clarifications" ADD CONSTRAINT "clarifications_answerer_id_fkey" FOREIGN KEY ("answerer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_tender_id_fkey" FOREIGN KEY ("tender_id") REFERENCES "tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "bids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
