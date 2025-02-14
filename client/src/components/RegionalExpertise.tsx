import { Card, CardContent } from "@/components/ui/card";

export default function RegionalExpertise() {
  const regions = [
    {
      name: "Nashik",
      image: "https://images.unsplash.com/photo-1694667509674-676629c9d069",
      description: "Prime NA plots in developing areas"
    },
    {
      name: "Ozar",
      image: "https://images.unsplash.com/photo-1729556227126-452c221f1ef4",
      description: "Agricultural lands with excellent connectivity"
    },
    {
      name: "Dindori",
      image: "https://images.unsplash.com/photo-1593699301596-dca618016c95",
      description: "Investment opportunities in growing regions"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">Regional Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={region.image}
                alt={region.name}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{region.name}</h3>
                <p className="text-gray-600">{region.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
