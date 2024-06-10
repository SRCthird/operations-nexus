-- AlterTable
ALTER TABLE `template` MODIFY `design` ENUM('FullDisplay', 'FullDisplay2', 'FullDisplay3', 'FullDisplay4', 'FullDisplay5', 'FullWithCircle', 'ThreeOnTwo', 'OneByThree', 'SplitScreen', 'TwoByTwo', 'Transition2x2_3on2') NOT NULL DEFAULT 'FullDisplay';
