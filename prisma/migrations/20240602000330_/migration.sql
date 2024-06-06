/*
  Warnings:

  - You are about to alter the column `posX` on the `note` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `posY` on the `note` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `note` MODIFY `posX` DECIMAL(65, 30) NOT NULL,
    MODIFY `posY` DECIMAL(65, 30) NOT NULL;
