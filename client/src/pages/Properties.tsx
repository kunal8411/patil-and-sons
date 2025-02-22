import { useQuery } from "@tanstack/react-query";
// import PropertyCard from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Property } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import AddPropertyForm from "@/components/AddPropertyForm";
import { PropertyCard } from "@/components/PropertyCard";

export default function Properties() {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: allproperties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"]
  });

  console.log("allproperties are:", allproperties)
  

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
          {allproperties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}