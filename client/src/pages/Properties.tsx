import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Property } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import AddPropertyForm from "@/components/AddPropertyForm";

export default function Properties() {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  // const { data: properties, isLoading } = useQuery<Property[]>({
  //   queryKey: ["/api/properties"]
  // });
  const properties=[
    {
      id:123,
      title: "Premium NA Plot in Nashik",
      description: "Well-developed NA plot with excellent connectivity",
      price: "₹50 Lakhs",
      area: "2000 sq.ft",
      location: "Nashik",
      type: "NA Plot",
      images: ["https://is1-3.housingcdn.com/01c16c28/08cbb671362e9ed978ef1f82f5194a6b/v0/fs/residential_plot-for-sale-nashik_road-Nashik-plot_view.jpg"],
      videos: [],
      features: ["Corner Plot", "Ready for Construction", "All Utilities"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id:1234,
      title: "Agricultural Land in Dindori",
      description: "Fertile agricultural land with water source",
      price: "₹30 Lakhs",
      area: "1 Acre",
      location: "Ozar",
      type: "Agricultural",
      images: ["https://5.imimg.com/data5/ANDROID/Default/2021/4/BD/XV/AD/49810555/product-jpeg-500x500.jpg"],
      videos: [],
      features: ["Fertile Soil", "Water Source", "Road Access"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id:1235,
      title: "Agricultural Land in Ozar",
      description: "Fertile agricultural land",
      price: "₹80 Lakhs",
      area: "2 Acre",
      location: "Ozar",
      type: "Agricultural",
      images: ["https://5.imimg.com/data5/EI/MZ/KK/SELLER-1419216/agriculture-land-sale-500x500.jpg"],
      videos: [],
      features: ["Fertile Soil", "Water Source", "Road Access"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="w-full h-[400px] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-playfair">Available Properties</h1>
          {user?.isAdmin && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddPropertyForm onClose={() => setShowAddForm(false)} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}