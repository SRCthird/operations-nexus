/*
  Warnings:

  - Added the required column `DepartmentID` to the `action_tracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `action_tracker` ADD COLUMN `DepartmentID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `action_tracker` ADD CONSTRAINT `action_tracker_DepartmentID_fkey` FOREIGN KEY (`DepartmentID`) REFERENCES `departments`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
