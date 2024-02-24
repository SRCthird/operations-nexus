-- CreateTable
CREATE TABLE `departments` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Main` VARCHAR(191) NOT NULL,
    `Department` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NULL,
    `PPTXVersion` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `departments_Department_key`(`Department`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `display` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Main` VARCHAR(191) NOT NULL,
    `Sub` VARCHAR(191) NOT NULL,
    `Department` VARCHAR(191) NOT NULL,
    `Display` VARCHAR(191) NOT NULL,
    `Background` VARCHAR(191) NULL,

    UNIQUE INDEX `display_Display_key`(`Display`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
