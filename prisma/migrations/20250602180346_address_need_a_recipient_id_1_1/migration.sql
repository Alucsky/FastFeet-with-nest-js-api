/*
  Warnings:

  - You are about to drop the column `addressId` on the `recipients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recipientId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipientId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_addressId_fkey";

-- DropIndex
DROP INDEX "recipients_addressId_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "recipientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipients" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_recipientId_key" ON "addresses"("recipientId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
