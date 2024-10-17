/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hashedPswd]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPswd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_fromUser_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_toUser_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "chatId" TEXT NOT NULL,
ALTER COLUMN "fromUser" SET DATA TYPE TEXT,
ALTER COLUMN "toUser" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPswd" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatId_key" ON "Chat"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_hashedPswd_key" ON "User"("hashedPswd");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_fromUser_fkey" FOREIGN KEY ("fromUser") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_toUser_fkey" FOREIGN KEY ("toUser") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
