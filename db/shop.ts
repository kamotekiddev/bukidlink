import { relations } from 'drizzle-orm';
import { json, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { ProfileTable } from '@/db/user';

export const ShopTable = pgTable('shops', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    profile_id: uuid().references(() => ProfileTable.id),
    location: json().$type<Location>(),
});

export const storeRelations = relations(ShopTable, ({ one }) => ({
    user_profile: one(ProfileTable, {
        fields: [ShopTable.profile_id],
        references: [ProfileTable.id],
    }),
}));
