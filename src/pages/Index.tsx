
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilterSection from "../components/FilterSection";
import ProductGrid from "../components/ProductGrid";
import CartButton, { CartItem } from "../components/CartButton";
import Footer from "../components/Footer";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleAddToCart = (product: CartItem) => {
    setCartItems(prev => {
      // Check if product already exists in cart
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if product already exists
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      } else {
        // Add new product to cart
        return [...prev, product];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="flex-grow">
        <FilterSection 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />
        
        <ProductGrid 
          searchTerm={searchTerm} 
          activeFilter={activeFilter} 
          onAddToCart={handleAddToCart} 
        />
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

export default Index;
