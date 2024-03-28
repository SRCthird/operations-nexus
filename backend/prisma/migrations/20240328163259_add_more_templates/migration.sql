-- AlterTable
ALTER TABLE `nexus_display` MODIFY `Page` ENUM('FullDisplay', 'FullDisplay2', 'FullDisplay3', 'FullDisplay4', 'FullDisplay5', 'FullWithCircle', 'OneByThree', 'SplitScreen', 'ThreeOnTwo', 'TwoByTwo') NULL;

-- CreateTable
CREATE TABLE `Page_FullDisplay3` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NOT NULL,
    `Gradient` VARCHAR(191) NULL,
    `Transition` INTEGER NOT NULL DEFAULT 30,
    `App1` ENUM('PowerBI', 'PowerPoint') NULL,
    `App1_ID` INTEGER NULL,
    `App2` ENUM('PowerBI', 'PowerPoint') NULL,
    `App2_ID` INTEGER NULL,
    `App3` ENUM('PowerBI', 'PowerPoint') NULL,
    `App3_ID` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page_FullDisplay4` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NOT NULL,
    `Gradient` VARCHAR(191) NULL,
    `Transition` INTEGER NOT NULL DEFAULT 30,
    `App1` ENUM('PowerBI', 'PowerPoint') NULL,
    `App1_ID` INTEGER NULL,
    `App2` ENUM('PowerBI', 'PowerPoint') NULL,
    `App2_ID` INTEGER NULL,
    `App3` ENUM('PowerBI', 'PowerPoint') NULL,
    `App3_ID` INTEGER NULL,
    `App4` ENUM('PowerBI', 'PowerPoint') NULL,
    `App4_ID` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page_FullDisplay5` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NOT NULL,
    `Gradient` VARCHAR(191) NULL,
    `Transition` INTEGER NOT NULL DEFAULT 30,
    `App1` ENUM('PowerBI', 'PowerPoint') NULL,
    `App1_ID` INTEGER NULL,
    `App2` ENUM('PowerBI', 'PowerPoint') NULL,
    `App2_ID` INTEGER NULL,
    `App3` ENUM('PowerBI', 'PowerPoint') NULL,
    `App3_ID` INTEGER NULL,
    `App4` ENUM('PowerBI', 'PowerPoint') NULL,
    `App4_ID` INTEGER NULL,
    `App5` ENUM('PowerBI', 'PowerPoint') NULL,
    `App5_ID` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
