import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-playfair font-bold text-primary">
                Patil & Sons
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <a className="text-gray-700 hover:text-primary">Home</a>
            </Link>
            <Link href="/properties">
              <a className="text-gray-700 hover:text-primary">Properties</a>
            </Link>
            <Button variant="default" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
