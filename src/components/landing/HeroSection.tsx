
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center pt-16">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Real-World Experience. Real Opportunities. Real Impact.
            </h1>
            <p className="text-lg text-white">
              Connect with top companies, gain hands-on experience, and build your career—all in one platform.
            </p>
            <div>
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-white text-primary hover:bg-white/90 gap-2"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Skilled trades professionals"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
