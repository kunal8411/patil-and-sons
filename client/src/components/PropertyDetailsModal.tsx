import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export function PropertyDetailsModal({ isOpen, onClose, property }: PropertyDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const allMedia = [...property.images, ...property.videos];
  
  const nextMedia = () => {
    if (currentImageIndex < allMedia.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const previousMedia = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95%]">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>

        {/* Main Media Display */}
        <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
          {allMedia.length > 0 && (
            <>
              {currentImageIndex < property.images.length ? (
                <img
                  src={allMedia[currentImageIndex].url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={allMedia[currentImageIndex].url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Navigation Arrows */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    disabled={currentImageIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextMedia}
                    disabled={currentImageIndex === allMedia.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 disabled:opacity-50"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2 max-h-24 overflow-x-auto">
          {allMedia.map((media, index) => (
            <button
              key={media.publicId}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                currentImageIndex === index ? 'ring-2 ring-primary' : ''
              }`}
            >
              {index < property.images.length ? (
                <img
                  src={media.url}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>

        {/* Property Details */}
        <div className="mt-4 space-y-2">
          <p className="text-lg font-semibold">₹{property.price}</p>
          <p className="text-gray-600">{property.location}</p>
          <p className="text-gray-600">{property.area} sq ft</p>
          <p className="mt-2">{property.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 