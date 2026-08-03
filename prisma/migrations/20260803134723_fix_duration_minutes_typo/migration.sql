/*
  Warnings:

  - You are about to drop the column `durationMinutus` on the `event_type` table. All the data in the column will be lost.
  - Added the required column `durationMinutes` to the `event_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_type" DROP COLUMN "durationMinutus",
ADD COLUMN     "durationMinutes" INTEGER NOT NULL;
