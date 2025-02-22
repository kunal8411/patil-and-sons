import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPropertySchema } from "@shared/schema";
import type { InsertProperty } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";

interface AddPropertyFormProps {
  onClose: () => void;
}

export default function AddPropertyForm({ onClose }: AddPropertyFormProps) {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const form = useForm<InsertProperty>({
    resolver: zodResolver(insertPropertySchema),
    defaultValues: {
      images: [],
      videos: [],
      // features: [],
    },
  });

  const propertyMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      const res = await apiRequest("POST", "/api/properties", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Success",
        description: "Property added successfully",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Separate images and videos based on file type
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const videoFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("video/")
    );

    setImages((prev) => [...prev, ...imageFiles]);
    setVideos((prev) => [...prev, ...videoFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "video/*": [".mp4", ".mov", ".avi"],
    },
  });

  const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Set this in Cloudinary dashboard

      const resourceType = file.type.startsWith("image/") ? "image" : "video";

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dsgtncjhf/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const onSubmit = async (data: InsertProperty) => {
    try {
      // Upload all images
      const uploadedImages = await Promise.all(
        images.map((file) => uploadToCloudinary(file))
      );

      // Upload all videos
      const uploadedVideos = await Promise.all(
        videos.map((file) => uploadToCloudinary(file))
      );

      console.log("DATA IS", data);
      console.log("uploaded Images are", uploadedImages);
      console.log("uploaded Videos are", uploadedVideos);
      // const formattedFeatures = data.features ?
      //   (typeof data.features === 'string' ?
      //     data.features.split(',').map(f => f.trim()).filter(f => f !== '')
      //     : data.features)
      //   : [];

      // propertyMutation.mutate({
      //   ...data,
      //   images: uploadedImages,
      //   videos: uploadedVideos,
      //   features: formattedFeatures
      // });
      const { title, description, area, price, type, location } = data;
      try {
        const res = await apiRequest("POST", "/api/properties", {
          title,
          description,
          area,
          price,
          type,
          location,
          images: uploadedImages,
          videos: uploadedVideos,
        });

        toast({
          title: "Success",
          description: "Property added successfully",
        });
        onClose();
      } catch (error: any) {
        toast({
          title: "Error",
          description:
            error && error?.message ? error.message : "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (show toast notification, etc.)
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Property</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register("description")} />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...form.register("price")} type="string" />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="area">Area</Label>
              <Input id="area" {...form.register("area")} />
              {form.formState.errors.area && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.area.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Input id="type" {...form.register("type")} />
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>
          </div>

          {/* <div>
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input id="features" {...form.register("features")} />
            {form.formState.errors.features && (
              <p className="text-sm text-red-500">{form.formState.errors.features.message}</p>
            )}
          </div> */}

          <div>
            <Label>Upload Images & Videos</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-2 hover:border-gray-400 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports: Images (.jpg, .jpeg, .png, .gif) and Videos (.mp4,
                  .mov, .avi)
                </p>
              </div>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-4">
                <Label>Image Previews</Label>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {images.map((file, index) => (
                    <div key={`image-${index}`} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Previews */}
            {videos.length > 0 && (
              <div className="mt-4">
                <Label>Video Previews</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {videos.map((file, index) => (
                    <div key={`video-${index}`} className="relative group">
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-32 rounded-lg"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setVideos((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={propertyMutation.isPending}>
              {propertyMutation.isPending ? "Adding..." : "Add Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
