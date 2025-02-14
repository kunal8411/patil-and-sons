import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, Scale, Shield, Users } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Document Verification",
      description: "Thorough verification of all property documents"
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Legal Assistance",
      description: "Complete legal support throughout the process"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Consultation",
      description: "Professional guidance from local experts"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Investment",
      description: "Safe and transparent investment process"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-primary">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
