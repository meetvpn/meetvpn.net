/*
  Warnings:

  - You are about to drop the column `keyId` on the `AccessKey` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AccessKey_keyId_key";

-- AlterTable
ALTER TABLE "AccessKey" DROP COLUMN "keyId";
