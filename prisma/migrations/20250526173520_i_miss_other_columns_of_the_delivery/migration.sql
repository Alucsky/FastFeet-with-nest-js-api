/*
  Warnings:

  - Added the required column `neighborhood` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postedAt` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Made the column `recipientId` on table `deliveries` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'PICKED_UP', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_recipientId_fkey";

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "pickedUpAt" TIMESTAMP(3),
ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "DeliveryStatus" NOT NULL,
ALTER COLUMN "recipientId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
