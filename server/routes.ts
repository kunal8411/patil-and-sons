import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertPropertySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Public routes
  app.get("/api/properties", async (_req, res) => {
    const properties = await storage.getProperties();
    res.json(properties);
  });

  app.get("/api/testimonials", async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // Protected routes - require authentication
  app.post("/api/properties", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const propertyData = insertPropertySchema.parse(req.body);
    const property = await storage.createProperty(propertyData);
    res.status(201).json(property);
  });

  const httpServer = createServer(app);
  return httpServer;
}