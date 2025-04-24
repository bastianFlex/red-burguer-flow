
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartButton, { CartItem } from "../components/CartButton";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Mock best sellers data
const bestSellers = [
  {
    id: 1,
    name: "Double Cheese",
    description: "Hambúrguer duplo com queijo cheddar derretido, cebola caramelizada e molho especial.",
    price: 38.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 324,
    category: "Lanches"
  },
  {
    id: 2,
    name: "Combo Família",
    description: "4 hambúrgueres + 2 porções de batatas + 2 refrigerantes.",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 286,
    category: "Combos"
  },
  {
    id: 3,
    name: "Wrap de Frango",
    description: "Frango grelhado com alface, tomate e molho especial.",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 204,
    category: "Lanches"
  },
  {
    id: 4,
    name: "Tábua de Frios",
    description: "Seleção de queijos, salames, azeitonas e pães artesanais.",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 182,
    category: "Tradicionais"
  },
  {
    id: 5,
    name: "Combo Wrap + Suco",
    description: "Wrap de frango + suco natural de laranja ou limão.",
    price: 42.90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    rating: 4.6,
    reviews: 158,
    category: "Combos"
  },
  {
    id: 6,
    name: "Classic Burger",
    description: "Hambúrguer de carne, queijo, alface, tomate e molho especial.",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviews: 129,
    category: "Lanches"
  }
];

// Motion variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MaisVendidos = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const handleAddToCart = (product: any) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, newItem];
      }
    });
    
    toast({
      title: "Item adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      variant: "default",
      className: "bg-burguer-darkRed text-white"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Mais <span className="text-burguer-red">Vendidos</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça os produtos favoritos dos nossos clientes. Uma seleção especial 
              dos items mais pedidos e amados da nossa hamburgueria.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={animateItems ? "show" : "hidden"}
          >
            {bestSellers.map((product, index) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 bg-burguer-gold text-white px-4 py-1 z-10 rounded-br-lg font-semibold flex items-center">
                  <span className="mr-1">#{index + 1}</span> 
                  <Star size={16} fill="white" />
                </div>
                
                <div className="relative h-56 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl">{product.name}</h3>
                    <span className="bg-red-50 text-burguer-red px-2 py-1 rounded-full text-xs">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {product.rating} ({product.reviews} avaliações)
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-burguer-red">
                      R$ {product.price.toFixed(2)}
                    </span>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-burguer-red hover:bg-burguer-darkRed text-white"
                    >
                      <ShoppingCart size={18} className="mr-1" /> Adicionar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      
      <CartButton 
        itemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} 
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Footer />
    </div>
  );
};

export default MaisVendidos;
