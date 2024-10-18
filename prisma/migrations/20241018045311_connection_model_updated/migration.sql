-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_connectedUserEmail_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_userEmail_fkey";

-- DropIndex
DROP INDEX "Connections_userEmail_connectedUserEmail_key";
