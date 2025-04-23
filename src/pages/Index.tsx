
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilterSection from "../components/FilterSection";
import ProductGrid from "../components/ProductGrid";
import CartButton from "../components/CartButton";
import Footer from "../components/Footer";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [cartItems, setCartItems] = useState(0);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleAddToCart = () => {
    setCartItems(prev => prev + 1);
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
      
      <CartButton itemCount={cartItems} />
      <Footer />
    </div>
  );
};

export default Index;
