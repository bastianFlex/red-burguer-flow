
import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-gradient-to-b from-burguer-cream to-burguer-light"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)'
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className={cn(
          "transition-all duration-1000 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
          <h1 className="text-white font-poppins font-extrabold text-4xl md:text-6xl mb-6 text-outline">
            RED <span className="text-burguer-gold">BURGUER</span>
          </h1>
          
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8">
            A experiência mais saborosa em hambúrgueres artesanais. 
            Sabor e qualidade que você merece.
          </p>
          
          <div className={cn(
            "transition-all duration-1000 delay-300 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <Button
              onClick={scrollToMenu}
              className="bg-burguer-red hover:bg-burguer-darkRed text-white font-poppins font-semibold px-8 py-6 rounded-full btn-pulse shadow-lg transition-all duration-300 group"
            >
              <span>Ver Cardápio</span>
              <ArrowDown className="ml-2 group-hover:animate-bounce" size={18} />
            </Button>
          </div>
          
          <div className={cn(
            "flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-12",
            "transition-all duration-1000 delay-500 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 animate-float">
              <h3 className="text-burguer-gold font-bold">Horário</h3>
              <p className="text-white">Seg a Dom • 11:00 - 23:00</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 animate-float">
              <h3 className="text-burguer-gold font-bold">Endereço</h3>
              <p className="text-white">Av. Burguer, 1250 • Centro</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <ArrowDown className="text-white" size={30} />
      </div>
    </div>
  );
};

export default Hero;
