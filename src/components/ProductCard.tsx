
import React, { useState } from "react";
import { Star, Plus, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  tags?: string[];
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  description,
  rating,
  tags = [],
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart();
    
    toast({
      title: "Adicionado ao carrinho!",
      description: `${name} foi adicionado ao seu carrinho.`,
      variant: "default",
      className: "bg-burguer-darkRed text-white"
    });
    
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-hover card-scale group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-black/70 text-white text-xs px-2 py-1 rounded-full animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Rating */}
        <div className="absolute top-3 right-3">
          <div className="bg-burguer-gold rounded-full px-2 py-1 flex items-center text-sm font-semibold text-white">
            <Star 
              className={cn(
                "mr-1",
                isHovered ? "animate-spin-slow" : ""
              )} 
              fill="white" 
              size={16} 
            />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-poppins font-bold text-lg mb-1 text-burguer-dark">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-poppins font-bold text-xl text-burguer-red">
            R$ {price.toFixed(2)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full btn-pulse",
              "transition-all duration-300 relative overflow-hidden",
              isAdded 
                ? "bg-green-600 text-white" 
                : "bg-burguer-red text-white hover:bg-burguer-darkRed"
            )}
          >
            {isAdded ? (
              <CheckCircle className="animate-scale-in" size={20} />
            ) : (
              <Plus size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
