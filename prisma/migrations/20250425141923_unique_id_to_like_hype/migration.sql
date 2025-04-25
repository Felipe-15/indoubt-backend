/*
  Warnings:

  - The primary key for the `Hype` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Hype` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Like` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hype" (
    "ownerId" TEXT NOT NULL,
    "relatedQuestion" TEXT NOT NULL,

    PRIMARY KEY ("ownerId", "relatedQuestion"),
    CONSTRAINT "Hype_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Hype_relatedQuestion_fkey" FOREIGN KEY ("relatedQuestion") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hype" ("ownerId", "relatedQuestion") SELECT "ownerId", "relatedQuestion" FROM "Hype";
DROP TABLE "Hype";
ALTER TABLE "new_Hype" RENAME TO "Hype";
CREATE TABLE "new_Like" (
    "ownerId" TEXT NOT NULL,
    "relatedAnswer" TEXT NOT NULL,

    PRIMARY KEY ("ownerId", "relatedAnswer"),
    CONSTRAINT "Like_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_relatedAnswer_fkey" FOREIGN KEY ("relatedAnswer") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("ownerId", "relatedAnswer") SELECT "ownerId", "relatedAnswer" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
