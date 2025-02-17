import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <img
        src={property.images[0]} // Display the first image as the main image
        alt={property.title}
        className="h-48 w-full object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Ruler className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.area}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {property.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-semibold text-primary">
          {property.price}
        </span>
        <Badge variant="secondary">{property.type}</Badge>
      </CardFooter>
    </Card>
  );
}