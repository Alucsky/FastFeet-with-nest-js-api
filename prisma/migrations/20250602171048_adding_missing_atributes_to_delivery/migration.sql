/*
  Warnings:

  - Added the required column `deliveryConfirmationUrl` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "deliveryConfirmationUrl" TEXT NOT NULL,
ADD COLUMN     "pickedUpAt" TIMESTAMP(3);
