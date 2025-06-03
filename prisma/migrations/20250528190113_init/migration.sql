/*
  Warnings:

  - Added the required column `competencia` to the `Alocacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alocacao" ADD COLUMN     "competencia" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_exclusao" TIMESTAMP(3);
