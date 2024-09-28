/*
  Warnings:

  - Added the required column `description` to the `TypeCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypeCategory" ADD COLUMN     "description" VARCHAR(75) NOT NULL;
