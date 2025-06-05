import { pgTable, text, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const User = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: varchar({ length: 256 }).unique().notNull(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
});

export const userRelations = relations(User, ({ one }) => ({
    profile: one(Profile),
}));

export const Profile = pgTable('profiles', {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid().references(() => User.id),
    photo_url: text(),
});

export const profileRelations = relations(Profile, ({ one }) => ({
    user: one(User, { fields: [Profile.user_id], references: [User.id] }),
}));
