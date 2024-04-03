/*
  Warnings:

  - Made the column `Background` on table `nexus_department` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Background` on table `nexus_display` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Nexus_Display_Display_key` ON `nexus_display`;

-- AlterTable
ALTER TABLE `nexus_department` MODIFY `Background` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `nexus_display` MODIFY `Background` VARCHAR(191) NOT NULL;
