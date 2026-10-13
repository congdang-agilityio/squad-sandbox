-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "privacyNoticeAgreedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
    -- Emails are stored lowercased so the unique index is case-insensitive in practice.
    CONSTRAINT "User_email_lowercase_check" CHECK ("email" = lower("email"))
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
