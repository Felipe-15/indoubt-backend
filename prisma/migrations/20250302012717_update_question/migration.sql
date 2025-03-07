/*
  Warnings:

  - You are about to drop the column `verfifiedAnswer` on the `Question` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT NOT NULL,
    "answers" INTEGER NOT NULL,
    "hypes" INTEGER NOT NULL DEFAULT 0,
    "subject" TEXT NOT NULL,
    "verifiedAnswer" TEXT,
    CONSTRAINT "Question_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("answers", "content", "createdAt", "hypes", "id", "ownerId", "subject", "updatedAt") SELECT "answers", "content", "createdAt", "hypes", "id", "ownerId", "subject", "updatedAt" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
