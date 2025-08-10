-- CreateTable
CREATE TABLE "public"."registration_drafts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 1,
    "businessFlow" TEXT,
    "personalInfo" JSONB,
    "businessInfo" JSONB,
    "selectedBusinessId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "businessId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_drafts_email_key" ON "public"."registration_drafts"("email");
