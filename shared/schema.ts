import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  area: text("area").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  images: text("images").array().notNull(),
  videos: text("videos").array().notNull(),
  features: text("features").array().notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  location: text("location").notNull(),
});

// Schema for user operations
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertPropertySchema = createInsertSchema(properties).omit({ 
  id: true,
  createdAt: true,
  updatedAt: true 
});
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;