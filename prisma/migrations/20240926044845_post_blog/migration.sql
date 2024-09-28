-- CreateTable
CREATE TABLE "cattasks" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "tasks_category_fkey" FOREIGN KEY ("category") REFERENCES "cattasks" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT,
    "tittle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "cattasks_name_key" ON "cattasks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_id_key" ON "blog_posts"("id");
