/*
  Warnings:

  - A unique constraint covering the columns `[keyId]` on the table `AccessKey` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AccessKey" ADD COLUMN     "keyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "AccessKey_keyId_key" ON "AccessKey"("keyId");
