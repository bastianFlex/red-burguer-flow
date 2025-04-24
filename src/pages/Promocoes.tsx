
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartButton, { CartItem } from "../components/CartButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const promotions = [
  {
    id: 1,
    name: "Combo Família",
    description: "4 hambúrgueres + 2 porções de batatas + 2 refrigerantes",
    originalPrice: 120.00,
    discountedPrice: 99.90,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "30% OFF"
  },
  {
    id: 2,
    name: "Terça do Burguer",
    description: "Qualquer hambúrguer tradicional com 30% de desconto",
    originalPrice: 35.90,
    discountedPrice: 25.13,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Terça",
    validity: "Válido somente às terças-feiras"
  },
  {
    id: 3,
    name: "Feliz Hora",
    description: "Bebidas com 50% de desconto das 18h às 20h",
    originalPrice: 12.90,
    discountedPrice: 6.45,
    image: "https://images.unsplash.com/photo-1589733955941-5eedf5d3f118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    badge: "50% OFF",
    validity: "De segunda a sexta"
  },
  {
    id: 4,
    name: "Combo Premium",
    description: "Hambúrguer gourmet + batata + bebida",
    originalPrice: 65.00,
    discountedPrice: 49.90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    badge: "Novo"
  }
];

const Promocoes = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleOrderNow = (promotion: any) => {
    const newItem: CartItem = {
      id: promotion.id,
      name: promotion.name,
      price: promotion.discountedPrice,
      quantity: 1,
      image: promotion.image
    };
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === promotion.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === promotion.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, newItem];
      }
    });
    
    toast({
      title: "Promoção adicionada!",
      description: `${promotion.name} foi adicionado ao carrinho.`,
      variant: "default",
      className: "bg-burguer-darkRed text-white"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">
              Promoções <span className="text-burguer-red">Especiais</span>
            </h1>
            <Link 
              to="/cardapio" 
              className="flex items-center text-burguer-red hover:text-burguer-darkRed transition-colors"
            >
              Ver cardápio completo <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-xl mb-12 bg-gradient-to-r from-yellow-50 to-red-50">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center hidden md:block"
                 style={{ backgroundImage: `url(${promotions[0].image})` }} />
                 
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="inline-block bg-burguer-gold text-white font-bold px-3 py-1 rounded-full mb-4 animate-pulse">
                {promotions[0].badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{promotions[0].name}</h2>
              <p className="text-gray-600 mb-4 text-lg">{promotions[0].description}</p>
              <div className="flex items-baseline mb-6">
                <span className="text-gray-400 line-through text-xl mr-3">R$ {promotions[0].originalPrice.toFixed(2)}</span>
                <span className="text-burguer-red font-bold text-3xl">R$ {promotions[0].discountedPrice.toFixed(2)}</span>
              </div>
              <Button 
                className="bg-burguer-red hover:bg-burguer-darkRed text-white px-8 py-6 rounded-full text-lg flex items-center"
                onClick={() => handleOrderNow(promotions[0])}
              >
                <ShoppingCart size={20} className="mr-2" /> Pedir Agora
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.slice(1).map((promo) => (
              <div key={promo.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${promo.image})` }} />
                  <div className="absolute top-3 left-3">
                    <span className="bg-burguer-gold text-white font-bold px-3 py-1 rounded-full">
                      {promo.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex">
                    <Star fill="gold" className="text-yellow-400" />
                    <Star fill="gold" className="text-yellow-400" />
                    <Star fill="gold" className="text-yellow-400" />
                    <Star fill="gold" className="text-yellow-400" />
                    <Star className="text-yellow-400" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{promo.name}</h3>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  
                  {promo.validity && (
                    <p className="text-burguer-red font-medium mb-3">{promo.validity}</p>
                  )}
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-gray-400 line-through mr-2">R$ {promo.originalPrice.toFixed(2)}</span>
                    <span className="text-burguer-red font-bold text-xl">R$ {promo.discountedPrice.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-burguer-red hover:bg-burguer-darkRed text-white"
                    onClick={() => handleOrderNow(promo)}
                  >
                    Pedir Agora
                  </Button>
                </div>
              </div>
            ))}
          </div>
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

export default Promocoes;
