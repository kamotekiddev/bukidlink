CREATE TABLE "shops"
(
    "id"         uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name"       text                                       NOT NULL,
    "profile_id" uuid,
    "location"   json
);
--> statement-breakpoint
DROP TABLE "stores" CASCADE;--> statement-breakpoint
ALTER TABLE "shops"
    ADD CONSTRAINT "shops_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles" ("id") ON DELETE no action ON UPDATE no action;