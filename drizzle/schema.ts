import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json, tinyint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Labs table - stores information about research laboratories
 */
export const labs = mysqlTable("labs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  website: varchar("website", { length: 500 }),
  researchFields: json("researchFields").$type<string[]>(),
  services: json("services").$type<string[]>(),
  impactScore: decimal("impactScore", { precision: 5, scale: 2 }).default("0"),
  publicationsCount: int("publicationsCount").default(0),
  imageUrl: varchar("imageUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lab = typeof labs.$inferSelect;
export type InsertLab = typeof labs.$inferInsert;

/**
 * Researchers table - stores information about researchers
 */
export const researchers = mysqlTable("researchers", {
  id: int("id").autoincrement().primaryKey(),
  labId: int("labId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  expertise: json("expertise").$type<string[]>(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  bio: text("bio"),
  publicationsCount: int("publicationsCount").default(0),
  citationCount: int("citationCount").default(0),
  impactScore: decimal("impactScore", { precision: 5, scale: 2 }).default("0"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  availableForCollaboration: tinyint("availableForCollaboration").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Researcher = typeof researchers.$inferSelect;
export type InsertResearcher = typeof researchers.$inferInsert;

/**
 * Equipment table - stores information about laboratory equipment
 */
export const equipment = mysqlTable("equipment", {
  id: int("id").autoincrement().primaryKey(),
  labId: int("labId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  capabilities: json("capabilities").$type<string[]>(),
  specifications: json("specifications").$type<Record<string, string>>(),
  manufacturer: varchar("manufacturer", { length: 255 }),
  model: varchar("model", { length: 255 }),
  yearAcquired: int("yearAcquired"),
  available: tinyint("available").default(1),
  bookingStatus: mysqlEnum("bookingStatus", ["available", "booked", "maintenance"]).default("available"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Equipment = typeof equipment.$inferSelect;
export type InsertEquipment = typeof equipment.$inferInsert;

/**
 * Collaboration Requests table - stores collaboration requests from companies
 */
export const collaborationRequests = mysqlTable("collaborationRequests", {
  id: int("id").autoincrement().primaryKey(),
  requesterId: int("requesterId"),
  requesterName: varchar("requesterName", { length: 255 }).notNull(),
  requesterEmail: varchar("requesterEmail", { length: 320 }).notNull(),
  requesterCompany: varchar("requesterCompany", { length: 255 }),
  requesterPhone: varchar("requesterPhone", { length: 20 }),
  labId: int("labId"),
  researcherId: int("researcherId"),
  equipmentId: int("equipmentId"),
  collaborationType: mysqlEnum("collaborationType", ["contract_research", "joint_project", "pilot_testing", "consultation"]).notNull(),
  description: text("description").notNull(),
  budget: varchar("budget", { length: 100 }),
  timeline: varchar("timeline", { length: 255 }),
  status: mysqlEnum("status", ["pending", "reviewed", "accepted", "rejected", "completed"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CollaborationRequest = typeof collaborationRequests.$inferSelect;
export type InsertCollaborationRequest = typeof collaborationRequests.$inferInsert;

/**
 * Embeddings table - stores vector embeddings for semantic search
 */
export const embeddings = mysqlTable("embeddings", {
  id: int("id").autoincrement().primaryKey(),
  entityType: mysqlEnum("entityType", ["lab", "researcher", "equipment"]).notNull(),
  entityId: int("entityId").notNull(),
  text: text("text").notNull(),
  embedding: text("embedding").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Embedding = typeof embeddings.$inferSelect;
export type InsertEmbedding = typeof embeddings.$inferInsert;
