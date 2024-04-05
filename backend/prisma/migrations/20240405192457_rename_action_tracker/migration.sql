/*
  Warnings:

  - You are about to drop the `nexus_actiontracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `nexus_actiontracker` DROP FOREIGN KEY `Nexus_ActionTracker_Department_fkey`;

-- DropTable
DROP TABLE `nexus_actiontracker`;

-- CreateTable
CREATE TABLE `App_ActionTracker` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Department` VARCHAR(191) NOT NULL,
    `Line` VARCHAR(191) NOT NULL,
    `Date_Opened` DATE NOT NULL,
    `Date_Due` DATE NULL,
    `Date_Closed` DATE NULL,
    `Category` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Updates` VARCHAR(191) NULL,
    `Owner` VARCHAR(191) NULL,
    `Status` INTEGER NOT NULL,
    `Priority` INTEGER NOT NULL,
    `Logged_By` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `App_ActionTracker` ADD CONSTRAINT `App_ActionTracker_Department_fkey` FOREIGN KEY (`Department`) REFERENCES `Nexus_Department`(`Department`) ON DELETE RESTRICT ON UPDATE CASCADE;
