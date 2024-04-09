/*
  Warnings:

  - Added the required column `DepartmentField` to the `App_ActionTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app_actiontracker` ADD COLUMN `AreaField` VARCHAR(191) NULL,
    ADD COLUMN `DepartmentField` VARCHAR(191) NOT NULL;
