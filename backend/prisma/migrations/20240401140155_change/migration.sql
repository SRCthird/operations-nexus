/*
  Warnings:

  - You are about to drop the column `Page_ID` on the `nexus_display` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `nexus_display` RENAME COLUMN `Page_ID` TO `Template_ID`;
