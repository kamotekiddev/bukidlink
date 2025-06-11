ALTER TABLE "profiles"
    ADD COLUMN "user_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "userType";