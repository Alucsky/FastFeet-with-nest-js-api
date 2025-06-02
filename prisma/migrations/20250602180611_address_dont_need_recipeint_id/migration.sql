/*
  Warnings:

  - You are about to drop the column `recipientId` on the `addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `recipients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_recipientId_fkey";

-- DropIndex
DROP INDEX "addresses_recipientId_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "recipientId";

-- AlterTable
ALTER TABLE "recipients" ADD COLUMN     "addressId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "recipients_addressId_key" ON "recipients"("addressId");

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
