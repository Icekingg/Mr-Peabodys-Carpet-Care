import { type User, type InsertUser, type Booking, type InsertBooking, bookings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByDate(date: string): Promise<Booking[]>;
  updateBookingLeadId(bookingId: number, leadId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    return { ...insertUser, id };
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [result] = await db.insert(bookings).values(booking).returning();
    return result;
  }

  async getBookingsByDate(date: string): Promise<Booking[]> {
    return db.select().from(bookings).where(eq(bookings.date, date));
  }

  async updateBookingLeadId(bookingId: number, leadId: string): Promise<void> {
    await db.update(bookings).set({ housecallProLeadId: leadId }).where(eq(bookings.id, bookingId));
  }
}

export const storage = new DatabaseStorage();
