import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/PropertyCard";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@shared/schema";
import { useEffect } from "react";

export default function Properties() {
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
      imageUrl: "https://is1-3.housingcdn.com/01c16c28/08cbb671362e9ed978ef1f82f5194a6b/v0/fs/residential_plot-for-sale-nashik_road-Nashik-plot_view.jpg",
      features: ["Corner Plot", "Ready for Construction", "All Utilities"]
    },
    {
      id:1234,
      title: "Agricultural Land in Dindori",
      description: "Fertile agricultural land with water source",
      price: "₹30 Lakhs",
      area: "1 Acre",
      location: "Ozar",
      type: "Agricultural",
      imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2021/4/BD/XV/AD/49810555/product-jpeg-500x500.jpg",
      features: ["Fertile Soil", "Water Source", "Road Access"]
    },
    {
      id:1235,
      title: "Agricultural Land in Ozar",
      description: "Fertile agricultural land",
      price: "₹80 Lakhs",
      area: "2 Acre",
      location: "Ozar",
      type: "Agricultural",
      imageUrl: "https://5.imimg.com/data5/EI/MZ/KK/SELLER-1419216/agriculture-land-sale-500x500.jpg",
      features: ["Fertile Soil", "Water Source", "Road Access"]
    }
  ]
var isLoading=false;
  useEffect(()=>{
    isLoading=true;
    setTimeout(()=>{
      isLoading=false;
    },1000)
   
  },[])

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
