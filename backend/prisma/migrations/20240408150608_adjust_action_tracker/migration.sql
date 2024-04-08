/*
  Warnings:

  - You are about to drop the column `Category` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Date_Closed` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Date_Due` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Date_Opened` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Line` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Logged_By` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Owner` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Priority` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `app_actiontracker` table. All the data in the column will be lost.
  - You are about to drop the column `Updates` on the `app_actiontracker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `app_actiontracker` DROP COLUMN `Category`,
    DROP COLUMN `Date_Closed`,
    DROP COLUMN `Date_Due`,
    DROP COLUMN `Date_Opened`,
    DROP COLUMN `Description`,
    DROP COLUMN `Line`,
    DROP COLUMN `Logged_By`,
    DROP COLUMN `Owner`,
    DROP COLUMN `Priority`,
    DROP COLUMN `Status`,
    DROP COLUMN `Updates`,
    ADD COLUMN `Area` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `template_fulldisplay` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_fulldisplay2` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_fulldisplay3` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App3` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_fulldisplay4` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App3` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App4` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_fulldisplay5` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App3` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App4` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App5` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_fullwithcircle` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_onebythree` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App3` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App4` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_splitscreen` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_threeontwo` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App3` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App4` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App5` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;

-- AlterTable
ALTER TABLE `template_twobytwo` MODIFY `App1` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App2` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App3` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App4` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL,
    MODIFY `App5` ENUM('PowerBI', 'PowerPoint', 'ActionTracker') NULL;
