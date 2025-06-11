import { ShopTable } from '@/db/shop';
import { type Name } from '@/typings';
import { relations } from 'drizzle-orm';
import { json, pgSchema, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod/v4';

const AuthSchema = pgSchema('auth');

const UserTable = AuthSchema.table('users', {
    id: uuid('id').primaryKey(),
});

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

export const profileRelations = relations(ProfileTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [ProfileTable.user_id],
        references: [UserTable.id],
    }),
    profile_store: one(ShopTable),
}));
