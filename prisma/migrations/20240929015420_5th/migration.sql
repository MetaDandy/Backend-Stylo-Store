-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "acronym" VARCHAR(10) NOT NULL DEFAULT 'N/A',
ADD COLUMN     "description" VARCHAR(75) NOT NULL DEFAULT 'No description';
