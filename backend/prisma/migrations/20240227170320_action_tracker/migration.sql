-- CreateTable
CREATE TABLE `action_tracker` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_Opened` DATE NOT NULL,
    `Category` ENUM('Downtime', 'Maintenance', 'Output') NOT NULL,
    `Action` VARCHAR(191) NOT NULL,
    `Updates` VARCHAR(191) NULL,
    `Owner` VARCHAR(191) NOT NULL,
    `Date_Due` DATE NULL,
    `Status` ENUM('Active', 'Closed') NOT NULL,
    `Date_Closed` DATE NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
