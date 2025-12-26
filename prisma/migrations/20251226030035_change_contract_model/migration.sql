/*
  Warnings:

  - Added the required column `title` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_lawId_fkey";

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'VND',
ADD COLUMN     "partnerTaxCode" TEXT,
ADD COLUMN     "riskAssessment" JSONB,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "lawId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_lawId_fkey" FOREIGN KEY ("lawId") REFERENCES "Law"("id") ON DELETE SET NULL ON UPDATE CASCADE;
