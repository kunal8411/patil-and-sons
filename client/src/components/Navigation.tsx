import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Navigation() {
  const { user, logoutMutation } = useAuth();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+919657419302", "_blank");
  };

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
            <Button variant="default" size="sm" onClick={handleWhatsAppClick}>
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
            {user ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}