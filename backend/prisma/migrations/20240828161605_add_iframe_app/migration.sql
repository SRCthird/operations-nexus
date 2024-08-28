-- AlterTable
ALTER TABLE `app` MODIFY `type` ENUM('PowerBI', 'PowerPoint', 'IFrame') NOT NULL;

-- CreateTable
CREATE TABLE `App_IFrame` (
    `id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `App_IFrame` ADD CONSTRAINT `App_IFrame_id_fkey` FOREIGN KEY (`id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
