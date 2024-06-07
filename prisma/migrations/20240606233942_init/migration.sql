-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `posX` DECIMAL(65, 30) NOT NULL,
    `posY` DECIMAL(65, 30) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
