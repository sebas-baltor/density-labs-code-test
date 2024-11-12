-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `body` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `replyToId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_replyToId_fkey` FOREIGN KEY (`replyToId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
