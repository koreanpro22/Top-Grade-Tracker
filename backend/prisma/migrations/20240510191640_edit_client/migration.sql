/*
  Warnings:

  - You are about to drop the column `clientId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_clientId_fkey";

-- DropIndex
DROP INDEX "Job_clientId_key";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "clientId",
ADD COLUMN     "clientEmail" TEXT,
ADD COLUMN     "clientName" TEXT,
ADD COLUMN     "clientPhone" TEXT;

-- DropTable
DROP TABLE "Client";
