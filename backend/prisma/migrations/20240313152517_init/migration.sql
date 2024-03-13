-- CreateTable
CREATE TABLE `Nexus_Settings` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Delay` INTEGER NOT NULL DEFAULT 30000,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nexus_ActionTracker` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Department` VARCHAR(191) NOT NULL,
    `Line` VARCHAR(191) NOT NULL,
    `Date_Opened` DATE NOT NULL,
    `Category` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Updates` VARCHAR(191) NULL,
    `Owner` VARCHAR(191) NULL,
    `Date_Due` DATE NULL,
    `Status` INTEGER NOT NULL,
    `Priority` INTEGER NOT NULL,
    `Logged_By` VARCHAR(191) NOT NULL,
    `Date_Closed` DATE NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nexus_Department` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Main` VARCHAR(191) NOT NULL,
    `Department` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NULL,
    `PPTXVersion` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Nexus_Department_Department_key`(`Department`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nexus_Display` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Main` VARCHAR(191) NOT NULL,
    `Sub` VARCHAR(191) NOT NULL,
    `Department` VARCHAR(191) NOT NULL,
    `Display` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NULL,
    `Page` ENUM('ThreeOnTwo', 'FullDisplay', 'OneByThree', 'SplitScreen', 'FullWithCircle') NULL,
    `Page_ID` INTEGER NULL,

    UNIQUE INDEX `Nexus_Display_Display_key`(`Display`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page_ThreeOnTwo` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NOT NULL,
    `Gradient` VARCHAR(191) NULL,
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

-- CreateTable
CREATE TABLE `App_PowerBI` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Type` VARCHAR(191) NOT NULL,
    `PowerBI_ID` INTEGER NOT NULL,
    `Group_ID` INTEGER NOT NULL,
    `Custom_Embed` VARCHAR(191) NULL,
    `Page_Name` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_PowerPoint` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Main` BOOLEAN NOT NULL DEFAULT true,
    `Department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Nexus_ActionTracker` ADD CONSTRAINT `Nexus_ActionTracker_Department_fkey` FOREIGN KEY (`Department`) REFERENCES `Nexus_Department`(`Department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nexus_Display` ADD CONSTRAINT `Nexus_Display_Department_fkey` FOREIGN KEY (`Department`) REFERENCES `Nexus_Department`(`Department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_PowerPoint` ADD CONSTRAINT `App_PowerPoint_Department_fkey` FOREIGN KEY (`Department`) REFERENCES `Nexus_Department`(`Department`) ON DELETE RESTRICT ON UPDATE CASCADE;
