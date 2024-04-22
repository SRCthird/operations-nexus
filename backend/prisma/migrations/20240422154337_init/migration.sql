-- CreateTable
CREATE TABLE `Nexus_Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `delay` INTEGER NOT NULL DEFAULT 30000,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nexus_Admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Nexus_Admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nexus_Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `main` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `pptxVersion` INTEGER NOT NULL DEFAULT 1,
    `background` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Nexus_Department_department_key`(`department`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nexus_Display` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `main` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `display` VARCHAR(191) NOT NULL,
    `background` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Nexus_Display_display_key`(`display`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `design` ENUM('FullDisplay', 'FullDisplay2', 'FullDisplay3', 'FullDisplay4', 'FullDisplay5', 'FullWithCircle', 'ThreeOnTwo', 'OneByThree', 'SplitScreen', 'TwoByTwo') NOT NULL DEFAULT 'FullDisplay',
    `background` VARCHAR(191) NOT NULL,
    `gradient` VARCHAR(191) NULL,
    `transition` INTEGER NOT NULL DEFAULT 30,

    UNIQUE INDEX `Template_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NOT NULL,

    UNIQUE INDEX `App_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_ActionTracker` (
    `id` INTEGER NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `departmentField` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NULL,
    `areaField` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_PowerBI` (
    `id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `reportID` VARCHAR(191) NOT NULL,
    `groupID` VARCHAR(191) NOT NULL,
    `customEmbed` VARCHAR(191) NULL,
    `pageName` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `App_PowerPoint` (
    `id` INTEGER NOT NULL,
    `main` BOOLEAN NOT NULL DEFAULT true,
    `department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AppToTemplate` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AppToTemplate_AB_unique`(`A`, `B`),
    INDEX `_AppToTemplate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Nexus_Display` ADD CONSTRAINT `Nexus_Display_title_fkey` FOREIGN KEY (`title`) REFERENCES `Template`(`title`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nexus_Display` ADD CONSTRAINT `Nexus_Display_department_fkey` FOREIGN KEY (`department`) REFERENCES `Nexus_Department`(`department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_ActionTracker` ADD CONSTRAINT `App_ActionTracker_id_fkey` FOREIGN KEY (`id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_ActionTracker` ADD CONSTRAINT `App_ActionTracker_department_fkey` FOREIGN KEY (`department`) REFERENCES `Nexus_Department`(`department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_PowerBI` ADD CONSTRAINT `App_PowerBI_id_fkey` FOREIGN KEY (`id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_PowerPoint` ADD CONSTRAINT `App_PowerPoint_id_fkey` FOREIGN KEY (`id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `App_PowerPoint` ADD CONSTRAINT `App_PowerPoint_department_fkey` FOREIGN KEY (`department`) REFERENCES `Nexus_Department`(`department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppToTemplate` ADD CONSTRAINT `_AppToTemplate_A_fkey` FOREIGN KEY (`A`) REFERENCES `App`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppToTemplate` ADD CONSTRAINT `_AppToTemplate_B_fkey` FOREIGN KEY (`B`) REFERENCES `Template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
