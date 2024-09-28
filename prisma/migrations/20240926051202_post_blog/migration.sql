/*
  Warnings:

  - You are about to drop the `blog_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "blog_posts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BlogPosts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT,
    "tittle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPosts_id_key" ON "BlogPosts"("id");
