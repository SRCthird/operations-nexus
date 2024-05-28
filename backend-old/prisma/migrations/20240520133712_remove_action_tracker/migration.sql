/*
  Warnings:

  - The values [ActionTracker] on the enum `App_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `app_actiontracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `app_actiontracker` DROP FOREIGN KEY `App_ActionTracker_department_fkey`;

-- DropForeignKey
ALTER TABLE `app_actiontracker` DROP FOREIGN KEY `App_ActionTracker_id_fkey`;

-- AlterTable
ALTER TABLE `app` MODIFY `type` ENUM('PowerBI', 'PowerPoint') NOT NULL;

-- DropTable
DROP TABLE `app_actiontracker`;
