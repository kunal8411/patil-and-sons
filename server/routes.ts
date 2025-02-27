import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertPropertySchema } from "@shared/schema";
import Properties from "./models/Properties";
import dbConnect from "./database/dbConnect";
export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Public routes
  app.get("/api/properties", async (_req, res) => {
    let result = await dbConnect();
    try {
      const allproperties = await Properties.find();
      res.status(200).json(allproperties);
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
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
    let result = await dbConnect();
    console.log("HERE DB CONNECTION SUCCESSFULL ");
    console.log("SERVER CALLED", req.body);
    const newProperty = new Properties(req.body);
    try {
      const result = await newProperty.save();
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
