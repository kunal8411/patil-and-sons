import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/PropertyCard";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@shared/schema";

export default function Properties() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"]
  });

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
        <h1 className="text-4xl font-playfair mb-12">Available Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
