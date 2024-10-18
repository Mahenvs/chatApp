/*
  Warnings:

  - You are about to drop the column `connectedUserId` on the `Connections` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Connections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,connectedUserEmail]` on the table `Connections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `connectedUserEmail` to the `Connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Connections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_connectedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_userId_fkey";

-- DropIndex
DROP INDEX "Connections_userId_connectedUserId_key";

-- AlterTable
ALTER TABLE "Connections" DROP COLUMN "connectedUserId",
DROP COLUMN "userId",
ADD COLUMN     "connectedUserEmail" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Connections_userEmail_connectedUserEmail_key" ON "Connections"("userEmail", "connectedUserEmail");

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_connectedUserEmail_fkey" FOREIGN KEY ("connectedUserEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
