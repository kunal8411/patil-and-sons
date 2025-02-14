import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
      <div className="absolute top-0 w-full h-full bg-center bg-cover"
           style={{
             backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1694667509674-676629c9d069')"
           }}>
        <span className="w-full h-full absolute opacity-50 bg-black"></span>
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="font-playfair">
              <h1 className="text-white font-semibold text-5xl mb-4">
                Premium Land Investments in Nashik
              </h1>
              <p className="mt-4 text-lg text-gray-200">
                Discover exclusive NA plots and agricultural lands in prime locations across Nashik, Ozar, and Dindori regions
              </p>
              <Button className="mt-8" size="lg">
                Explore Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
