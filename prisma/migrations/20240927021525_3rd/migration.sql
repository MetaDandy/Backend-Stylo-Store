/*
  Warnings:

  - You are about to drop the column `confirmation` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "confirmation",
DROP COLUMN "quantity";
