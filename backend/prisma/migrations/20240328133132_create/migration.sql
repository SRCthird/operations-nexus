-- CreateTable
CREATE TABLE `Page_FullDisplay2` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NOT NULL,
    `Gradient` VARCHAR(191) NULL,
    `Transition` INTEGER NOT NULL DEFAULT 30,
    `App1` ENUM('PowerBI', 'PowerPoint') NULL,
    `App1_ID` INTEGER NULL,
    `App2` ENUM('PowerBI', 'PowerPoint') NULL,
    `App2_ID` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
