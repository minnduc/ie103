-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'staff');--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "users_username_key" UNIQUE("username")
);

*/