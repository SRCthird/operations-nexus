-- CreateTable
CREATE TABLE `Nexus_Admins` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Nexus_Admins_Email_key`(`Email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
