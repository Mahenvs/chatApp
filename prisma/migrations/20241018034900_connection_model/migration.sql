-- CreateTable
CREATE TABLE "Connections" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "connectedUserId" INTEGER NOT NULL,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connections_userId_connectedUserId_key" ON "Connections"("userId", "connectedUserId");

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_connectedUserId_fkey" FOREIGN KEY ("connectedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
