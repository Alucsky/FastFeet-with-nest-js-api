-- DropForeignKey
ALTER TABLE "recipients" DROP CONSTRAINT "recipients_addressId_fkey";

-- AlterTable
ALTER TABLE "recipients" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
