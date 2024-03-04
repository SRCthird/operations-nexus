/*
  Warnings:

  - You are about to alter the column `Status` on the `action_tracker` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `action_tracker` MODIFY `Status` INTEGER NOT NULL;
