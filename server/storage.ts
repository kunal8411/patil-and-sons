import { users, properties, testimonials } from "@shared/schema";
import type { User, InsertUser, Property, InsertProperty, Testimonial, InsertTestimonial } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProperties(): Promise<Property[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentTestimonialId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentTestimonialId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });

    // Add some sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Create an admin user with hashed password
    const hashedPassword = await hashPassword("sandeepSir@11th");
    this.createUser({
      username: "patilandsons",
      password: hashedPassword,
      isAdmin: true
    });

    const sampleProperties: InsertProperty[] = [
      {
        title: "Premium NA Plot in Nashik",
        description: "Well-developed NA plot with excellent connectivity",
        price: "₹50 Lakhs",
        area: "2000 sq.ft",
        location: "Nashik",
        type: "NA Plot",
        images: [
          "https://is1-3.housingcdn.com/01c16c28/08cbb671362e9ed978ef1f82f5194a6b/v0/fs/residential_plot-for-sale-nashik_road-Nashik-plot_view.jpg",
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716"
        ],
        videos: [],
        features: ["Corner Plot", "Ready for Construction", "All Utilities"]
      },
      {
        title: "Agricultural Land in Dindori",
        description: "Fertile agricultural land with water source",
        price: "₹30 Lakhs",
        area: "1 Acre",
        location: "Ozar",
        type: "Agricultural",
        images: [
          "https://5.imimg.com/data5/ANDROID/Default/2021/4/BD/XV/AD/49810555/product-jpeg-500x500.jpg",
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
        ],
        videos: [],
        features: ["Fertile Soil", "Water Source", "Road Access"]
      },
      {
        title: "Agricultural Land in Ozar",
        description: "Fertile agricultural land",
        price: "₹80 Lakhs",
        area: "2 Acre",
        location: "Ozar",
        type: "Agricultural",
        images: [
          "https://5.imimg.com/data5/EI/MZ/KK/SELLER-1419216/agriculture-land-sale-500x500.jpg"
        ],
        videos: [],
        features: ["Fertile Soil", "Water Source", "Road Access"]
      }
    ];

    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Rajesh Patil",
        content: "Excellent service and professional guidance throughout the buying process.",
        location: "Nashik"
      },
      {
        name: "Amit Khairnar",
        content: "Very satisfied with the property documentation and legal assistance provided.",
        location: "Mumbai"
      }
    ];

    sampleProperties.forEach(property => this.createProperty(property));
    sampleTestimonials.forEach(testimonial => this.createTestimonial(testimonial));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id, 
      username: insertUser.username,
      password: insertUser.password,
      isAdmin: insertUser.isAdmin ?? false
    };
    this.users.set(id, user);
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const now = new Date().toISOString();
    const property: Property = { 
      ...insertProperty, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.properties.set(id, property);
    return property;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();