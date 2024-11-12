-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "endpoints" TEXT[],
ADD COLUMN     "type" TEXT DEFAULT 'web',
ALTER COLUMN "date" SET DATA TYPE TEXT;
