-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Survey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "googleRedirects" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "restaurantId" TEXT,
    CONSTRAINT "Survey_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Survey" ("createdAt", "id", "isActive", "restaurantId", "slug", "title", "updatedAt") SELECT "createdAt", "id", "isActive", "restaurantId", "slug", "title", "updatedAt" FROM "Survey";
DROP TABLE "Survey";
ALTER TABLE "new_Survey" RENAME TO "Survey";
CREATE UNIQUE INDEX "Survey_slug_key" ON "Survey"("slug");
CREATE INDEX "Survey_restaurantId_idx" ON "Survey"("restaurantId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
