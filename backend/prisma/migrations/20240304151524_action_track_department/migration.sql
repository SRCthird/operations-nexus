/*
  Warnings:

  - You are about to drop the column `Action` on the `action_tracker` table. All the data in the column will be lost.
  - You are about to drop the column `DepartmentID` on the `action_tracker` table. All the data in the column will be lost.
  - You are about to alter the column `Category` on the `action_tracker` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `Status` on the `action_tracker` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `Department` to the `action_tracker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `action_tracker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Line` to the `action_tracker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Logged_By` to the `action_tracker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Priority` to the `action_tracker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `action_tracker` DROP FOREIGN KEY `action_tracker_DepartmentID_fkey`;

-- AlterTable
ALTER TABLE `action_tracker` DROP COLUMN `Action`,
    DROP COLUMN `DepartmentID`,
    ADD COLUMN `Department` VARCHAR(191) NOT NULL,
    ADD COLUMN `Description` VARCHAR(191) NOT NULL,
    ADD COLUMN `Line` VARCHAR(191) NOT NULL,
    ADD COLUMN `Logged_By` VARCHAR(191) NOT NULL,
    ADD COLUMN `Priority` INTEGER NOT NULL,
    MODIFY `Category` VARCHAR(191) NOT NULL,
    MODIFY `Owner` VARCHAR(191) NULL,
    MODIFY `Status` VARCHAR(191) NOT NULL;
