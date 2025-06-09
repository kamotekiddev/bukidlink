ALTER TABLE "profiles"
    ADD COLUMN "name" json NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "full_name";