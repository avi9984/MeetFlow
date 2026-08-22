-- DropIndex
DROP INDEX "bookings_status_inviteeEmail_hostId_createdAt_idx";

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "inviteeNotes" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_inviteeEmail_idx" ON "bookings"("inviteeEmail");

-- CreateIndex
CREATE INDEX "bookings_hostId_createdAt_idx" ON "bookings"("hostId", "createdAt");
