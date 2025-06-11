CREATE TABLE "profiles"
(
    "id"        uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "full_name" text                                       NOT NULL,
    "user_id"   uuid                                       NOT NULL,
    "userType"  text                                       NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stores"
(
    "id"         uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name"       text                                       NOT NULL,
    "profile_id" uuid,
    "location"   json
);
--> statement-breakpoint
ALTER TABLE "profiles"
    ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stores"
    ADD CONSTRAINT "stores_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles" ("id") ON DELETE no action ON UPDATE no action;