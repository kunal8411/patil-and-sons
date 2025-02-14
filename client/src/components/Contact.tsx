import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Phone } from "lucide-react";

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+919876543210", "_blank");
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center mb-16">Contact Us</h2>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
                  alt="Our Team"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  <p className="text-gray-600 mb-6">
                    Ready to invest? Contact us for expert guidance and property details.
                  </p>
                </div>
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full mb-4"
                  variant="default"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>contact@patilandsons.com</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}