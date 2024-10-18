/*
  Warnings:

  - Added the required column `connectedUserName` to the `Connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connections" ADD COLUMN     "connectedUserName" TEXT NOT NULL;
