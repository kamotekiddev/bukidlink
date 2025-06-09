import { json, pgSchema, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod/v4';

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

type Name = {
    first: string;
    middle?: string;
    last: string;
};

const AuthSchema = pgSchema('auth');

const UserTable = AuthSchema.table('users', {
    id: uuid('id').primaryKey(),
});

export const userRelations = relations(UserTable, ({ one }) => ({
    profile: one(ProfileTable, {
        fields: [UserTable.id],
        references: [ProfileTable.user_id],
    }),
}));

export const ProfileTable = pgTable('profiles', {
    id: uuid().primaryKey().defaultRandom(),
    name: json().$type<Name>().notNull(),
    user_id: uuid()
        .references(() => UserTable.id)
        .notNull(),
    user_type: text({ enum: ['ADMIN', 'SELLER', 'BUYER'] }).notNull(),
});

export const insertProfileSchema = z.object({
    name: z.object({
        first: z.string().min(2),
        middle: z.string().optional(),
        last: z.string().min(2),
    }),
    user_type: z.enum(['ADMIN', 'SELLER', 'BUYER']),
});

export type CreateProfilePayload = z.infer<typeof insertProfileSchema>;

export const profileRelations = relations(ProfileTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [ProfileTable.user_id],
        references: [UserTable.id],
    }),
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
