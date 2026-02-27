import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";




export const user = pgTable("user",{
    id: uuid("id").defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    avatorLink: text('avator_link'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})