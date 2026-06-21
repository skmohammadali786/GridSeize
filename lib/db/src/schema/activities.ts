import { pgTable, serial, text, real, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coordSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const activitiesTable = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull().default("run"),
  distanceKm: real("distance_km").notNull().default(0),
  durationSec: integer("duration_sec").notNull().default(0),
  hexesCaptured: integer("hexes_captured").notNull().default(0),
  calories: integer("calories").notNull().default(0),
  xpEarned: integer("xp_earned").notNull().default(0),
  route: jsonb("route").notNull().default([]).$type<{ latitude: number; longitude: number }[]>(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activitiesTable).omit({ id: true, completedAt: true });
export const selectActivitySchema = createSelectSchema(activitiesTable);

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activitiesTable.$inferSelect;
