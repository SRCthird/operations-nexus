-- AlterTable
ALTER TABLE `nexus_display` MODIFY `Template` ENUM('FullDisplay', 'FullDisplay2', 'FullDisplay3', 'FullDisplay4', 'FullDisplay5', 'FullWithCircle', 'ThreeOnTwo', 'OneByThree', 'SplitScreen', 'TwoByTwo') NULL;

-- AlterTable
ALTER TABLE `template_fulldisplay5` MODIFY `Transition` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `template_twobytwo` ADD COLUMN `App5` ENUM('PowerBI', 'PowerPoint') NULL,
    ADD COLUMN `App5_ID` INTEGER NULL;
