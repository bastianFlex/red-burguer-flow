
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Tábua de Frios",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Seleção de queijos, salames, azeitonas e pães artesanais.",
    rating: 4.5,
    category: "Tradicionais",
    tags: ["Novo"]
  },
  {
    id: 2,
    name: "Wrap de Frango",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Frango grelhado com alface, tomate e molho especial.",
    rating: 4.5,
    category: "Tradicionais",
    tags: []
  },
  {
    id: 3,
    name: "Batata Rústica",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1623238913339-ecd39bac5d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Batatas assadas com ervas frescas e molho especial.",
    rating: 4.7,
    category: "Tradicionais",
    tags: []
  },
  {
    id: 4,
    name: "Suco Natural Misto",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1589733955941-5eedf5d3f118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Seleção de frutas frescas da estação.",
    rating: 4.6,
    category: "Bebidas",
    tags: ["Natural"]
  },
  {
    id: 5,
    name: "Refrigerante Lata",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1629203432180-71e9b29d0f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=743&q=80",
    description: "Coca-Cola, Fanta ou Guaraná 350ml.",
    rating: 4.5,
    category: "Bebidas",
    tags: []
  },
  {
    id: 6,
    name: "Água Mineral com Gás",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1520631171056-826d94416461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Água mineral com gás 500ml.",
    rating: 4.8,
    category: "Bebidas",
    tags: []
  },
  {
    id: 7,
    name: "Combo Wrap + Suco",
    price: 42.90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    description: "Wrap de frango + suco natural.",
    rating: 4.9,
    category: "Combos",
    tags: ["Combo"]
  },
  {
    id: 8,
    name: "Cesta de Pães",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Pães artesanais variados com manteiga.",
    rating: 4.7,
    category: "Tradicionais",
    tags: []
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
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setQuantity(1);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartFromDialog = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart();
    }
    handleDialogClose();
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 transform ${
                animateItems
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => handleProductClick(product)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-hover card-scale group cursor-pointer">
                {/* Image container */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  
                  {/* Rating */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-burguer-gold rounded-full px-2 py-1 flex items-center text-sm font-semibold text-white">
                      <span className="mr-1">★</span>
                      {product.rating.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-poppins font-bold text-lg mb-1 text-burguer-dark">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-poppins font-bold text-xl text-burguer-red">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-bold">{selectedProduct?.name}</DialogTitle>
            <DialogClose onClick={handleDialogClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          {selectedProduct && (
            <div className="mt-4">
              <div className="w-full h-60 bg-cover bg-center rounded-md mb-4" 
                   style={{backgroundImage: `url(${selectedProduct.image})`}} />
              
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
              
              <div className="mt-2 mb-4">
                <span className="font-bold">Coca-Cola, Fanta ou Guaraná 350ml</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="font-bold text-xl text-burguer-red">R$ {selectedProduct.price.toFixed(2)}</div>
                
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="mx-3 font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <textarea 
                  placeholder="Deixe um comentário sobre este produto..." 
                  className="w-full p-3 border rounded-md"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleAddToCartFromDialog}
                className="w-full mt-4 bg-burguer-red hover:bg-burguer-darkRed"
              >
                Adicionar • R$ {(selectedProduct.price * quantity).toFixed(2)}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductGrid;
