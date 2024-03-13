/*
  Warnings:

  - Added the required column `type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('NATURAL', 'SHOPKEEPER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "UserType" NOT NULL;
