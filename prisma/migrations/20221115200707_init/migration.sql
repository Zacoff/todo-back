-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Note" (
    "note_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "check" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("note_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
