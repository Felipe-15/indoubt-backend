/*
  Warnings:

  - A unique constraint covering the columns `[verifiedAnswer]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_verifiedAnswer_key" ON "Question"("verifiedAnswer");
