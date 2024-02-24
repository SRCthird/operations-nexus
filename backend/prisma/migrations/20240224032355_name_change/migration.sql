/*
  Warnings:

  - You are about to drop the column `Display` on the `settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `settings` DROP COLUMN `Display`,
    ADD COLUMN `Delay` INTEGER NOT NULL DEFAULT 30000;
