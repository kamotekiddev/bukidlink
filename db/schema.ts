import { json, pgSchema, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

type Location = {
    address_1?: string;
    brgy: string;
    city: string;
    province_or_state: string;
    zip_code: string;
    coords?: {
        lat: string;
        lng: string;
    };
};

const AuthSchema = pgSchema('auth');

const UserTable = AuthSchema.table('users', {
    id: uuid('id').primaryKey(),
});

export const ProfileTable = pgTable('profiles', {
    id: uuid().primaryKey().defaultRandom(),
    full_name: text().notNull(),
    user_id: uuid()
        .references(() => UserTable.id)
        .notNull(),
    userType: text({ enum: ['ADMIN', 'SELLER', 'BUYER'] }).notNull(),
});

export const profileRelations = relations(ProfileTable, ({ one }) => ({
    profile_store: one(StoreTable),
}));

export const StoreTable = pgTable('stores', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    profile_id: uuid().references(() => ProfileTable.id),
    location: json().$type<Location>(),
});

export const storeRelations = relations(StoreTable, ({ one }) => ({
    user_profile: one(ProfileTable, {
        fields: [StoreTable.profile_id],
        references: [ProfileTable.id],
    }),
}));
