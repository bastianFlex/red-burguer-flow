
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Classic Burguer",
    price: 29.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1299&q=80",
    description: "Pão brioche, hambúrguer 180g, queijo cheddar, alface, tomate e molho especial.",
    rating: 4.8,
    category: "Tradicionais",
    tags: ["Mais Vendido"]
  },
  {
    id: 2,
    name: "Double Cheese",
    price: 35.90,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=722&q=80",
    description: "Pão brioche, dois hambúrgueres 180g, queijo cheddar dobrado, cebola caramelizada e molho especial.",
    rating: 4.9,
    category: "Tradicionais",
    tags: ["Novo"]
  },
  {
    id: 3,
    name: "Smokehouse BBQ",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1368&q=80",
    description: "Pão australiano, hambúrguer 180g, queijo cheddar, bacon crocante, onion rings e molho barbecue.",
    rating: 4.7,
    category: "Gourmet",
    tags: []
  },
  {
    id: 4,
    name: "Mexicano",
    price: 37.90,
    image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    description: "Pão brioche, hambúrguer 180g, queijo cheddar, guacamole, jalapeños, tortilla crocante e molho picante.",
    rating: 4.6,
    category: "Gourmet",
    tags: ["Picante"]
  },
  {
    id: 5,
    name: "Beyond Burger",
    price: 36.90,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    description: "Pão vegano, hambúrguer 100% vegetal, queijo vegano, alface, tomate, cebola roxa e molho vegano especial.",
    rating: 4.5,
    category: "Vegetarianos",
    tags: ["Vegano"]
  },
  {
    id: 6,
    name: "Combo Classic",
    price: 45.90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    description: "Classic Burger + Batata Frita + Refrigerante.",
    rating: 4.8,
    category: "Combos",
    tags: ["Combo"]
  },
  {
    id: 7,
    name: "Coca-Cola",
    price: 7.90,
    image: "https://images.unsplash.com/photo-1629203432180-71e9b29d0f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=743&q=80",
    description: "Coca-Cola 350ml.",
    rating: 4.9,
    category: "Bebidas",
    tags: []
  },
  {
    id: 8,
    name: "Shake de Chocolate",
    price: 15.90,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Milk-shake cremoso de chocolate com calda e chantilly.",
    rating: 4.7,
    category: "Bebidas",
    tags: ["Sobremesa"]
  }
];

interface ProductGridProps {
  searchTerm: string;
  activeFilter: string;
  onAddToCart: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchTerm, activeFilter, onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(false);
    
    // Apply filters
    let results = [...mockProducts];
    
    // Category filter
    if (activeFilter !== "Todos") {
      results = results.filter(product => product.category === activeFilter);
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Add delay for animation
    const timer = setTimeout(() => {
      setFilteredProducts(results);
      setAnimateItems(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter]);

  return (
    <div id="menu" className="container mx-auto px-4 pb-16">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-poppins">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500">Tente mudar os filtros ou buscar outro termo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 transform ${
                animateItems
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                rating={product.rating}
                tags={product.tags}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
