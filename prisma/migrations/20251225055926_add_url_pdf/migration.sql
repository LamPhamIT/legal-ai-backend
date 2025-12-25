-- AlterTable
ALTER TABLE "ComplianceTask" ADD COLUMN     "evidenceUrl" TEXT;

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "documentUrl" TEXT,
ALTER COLUMN "riskScore" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Law" ADD COLUMN     "pdfUrl" TEXT;
