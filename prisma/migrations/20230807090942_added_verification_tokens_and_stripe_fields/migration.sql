/*
  Warnings:

  - A unique constraint covering the columns `[stripe_customer_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `stripe_current_period_end` DATETIME(3) NULL,
    ADD COLUMN `stripe_customer_id` VARCHAR(191) NULL,
    ADD COLUMN `stripe_price_id` VARCHAR(191) NULL,
    ADD COLUMN `stripe_subscription_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_token_key`(`token`),
    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_stripe_customer_id_key` ON `User`(`stripe_customer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_stripe_subscription_id_key` ON `User`(`stripe_subscription_id`);
