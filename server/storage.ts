import { users, type User, type InsertUser } from "@shared/schema";
import { properties, testimonials, type Property, type InsertProperty, type Testimonial, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProperties(): Promise<Property[]>;
  getTestimonials(): Promise<Testimonial[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentTestimonialId = 1;

    // Add some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleProperties: InsertProperty[] = [
      {
        title: "Premium NA Plot in Nashik",
        description: "Well-developed NA plot with excellent connectivity",
        price: "₹50 Lakhs",
        area: "2000 sq.ft",
        location: "Nashik",
        type: "NA Plot",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        features: ["Corner Plot", "Ready for Construction", "All Utilities"]
      },
      {
        title: "Agricultural Land in Ozar",
        description: "Fertile agricultural land with water source",
        price: "₹30 Lakhs",
        area: "1 Acre",
        location: "Ozar",
        type: "Agricultural",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
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
        name: "Amit Shah",
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
    const user: User = { ...insertUser, id };
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
    const property: Property = { ...insertProperty, id };
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