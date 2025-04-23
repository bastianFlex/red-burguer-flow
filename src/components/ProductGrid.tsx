
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, Plus, Minus, Trash2, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Enhanced mock data with better images
const mockProducts = [
  {
    id: 1,
    name: "Tábua de Frios",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Seleção de queijos, salames, azeitonas e pães artesanais.",
    rating: 4.5,
    category: "Tradicionais",
    tags: ["Novo"],
    bestSeller: true
  },
  {
    id: 2,
    name: "Wrap de Frango",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Frango grelhado com alface, tomate e molho especial.",
    rating: 4.5,
    category: "Tradicionais",
    tags: [],
    bestSeller: true
  },
  {
    id: 3,
    name: "Batata Rústica",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1623238913339-ecd39bac5d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Batatas assadas com ervas frescas e molho especial.",
    rating: 4.7,
    category: "Tradicionais",
    tags: [],
    bestSeller: false
  },
  {
    id: 4,
    name: "Suco Natural Misto",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1589733955941-5eedf5d3f118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Seleção de frutas frescas da estação.",
    rating: 4.6,
    category: "Bebidas",
    tags: ["Natural"],
    bestSeller: false
  },
  {
    id: 5,
    name: "Refrigerante Lata",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1629203432180-71e9b29d0f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=743&q=80",
    description: "Coca-Cola, Fanta ou Guaraná 350ml.",
    rating: 4.5,
    category: "Bebidas",
    tags: [],
    bestSeller: false
  },
  {
    id: 6,
    name: "Água Mineral com Gás",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1520631171056-826d94416461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Água mineral com gás 500ml.",
    rating: 4.8,
    category: "Bebidas",
    tags: [],
    bestSeller: false
  },
  {
    id: 7,
    name: "Combo Wrap + Suco",
    price: 42.90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    description: "Wrap de frango + suco natural.",
    rating: 4.9,
    category: "Combos",
    tags: ["Combo"],
    bestSeller: true
  },
  {
    id: 8,
    name: "Cesta de Pães",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Pães artesanais variados com manteiga.",
    rating: 4.7,
    category: "Tradicionais",
    tags: [],
    bestSeller: false
  },
  {
    id: 9,
    name: "Burger Clássico",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Hambúrguer de carne, queijo, alface, tomate e molho especial.",
    rating: 4.8,
    category: "Lanches",
    tags: ["Clássico"],
    bestSeller: true
  },
  {
    id: 10,
    name: "Double Cheese",
    price: 38.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Hambúrguer duplo com queijo cheddar derretido.",
    rating: 4.9,
    category: "Lanches", 
    tags: ["Favorito"],
    bestSeller: true
  },
  {
    id: 11,
    name: "Limonada Suíça",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1621263764776-1c171f8c0b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Limonada refrescante com leite condensado e hortelã.",
    rating: 4.7,
    category: "Bebidas",
    tags: ["Refrescante"],
    bestSeller: false
  },
  {
    id: 12,
    name: "Combo Família",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "4 hambúrgueres + 2 porções de batatas + 2 refrigerantes.",
    rating: 4.9,
    category: "Combos",
    tags: ["Promoção"],
    bestSeller: true
  }
];

interface ProductGridProps {
  searchTerm: string;
  activeFilter: string;
  onAddToCart: (product: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchTerm, activeFilter, onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [animateItems, setAnimateItems] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(6);
  const { toast } = useToast();

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
    setComment("");
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartFromDialog = () => {
    if (selectedProduct) {
      const productToAdd = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
        image: selectedProduct.image,
        comment: comment
      };
      onAddToCart(productToAdd);
      
      toast({
        title: "Produto adicionado!",
        description: `${quantity}x ${selectedProduct?.name} adicionado ao carrinho.`,
        variant: "default",
        className: "bg-burguer-darkRed text-white"
      });
      
      handleDialogClose();
    }
  };

  const handleAddToCartFromGrid = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    onAddToCart(productToAdd);
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} adicionado ao carrinho.`,
      variant: "default",
      className: "bg-burguer-darkRed text-white"
    });
  };

  const handleShowMore = () => {
    setVisibleProducts(prev => prev + 6);
  };

  return (
    <div id="menu" className="container mx-auto px-4 pb-16">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg shadow-inner">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-poppins">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500">Tente mudar os filtros ou buscar outro termo.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, visibleProducts).map((product, index) => (
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
                <div className="bg-white rounded-2xl overflow-hidden shadow-hover card-scale group cursor-pointer border-2 border-transparent hover:border-burguer-red">
                  {/* Image container */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {product.bestSeller && (
                        <span className="bg-burguer-gold text-white px-2 py-1 rounded-full text-xs animate-pulse">
                          Mais Vendido
                        </span>
                      )}
                      {product.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="bg-black/70 text-white text-xs px-2 py-1 rounded-full animate-fade-in"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Rating */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-burguer-gold rounded-full px-2 py-1 flex items-center text-sm font-semibold text-white">
                        <span className="mr-1">★</span>
                        {product.rating.toFixed(1)}
                      </div>
                    </div>

                    {/* Overlay hint */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white bg-burguer-red px-3 py-2 rounded-full text-sm font-medium">
                        Clique para detalhes
                      </span>
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
                      <button 
                        onClick={(e) => handleAddToCartFromGrid(e, product)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-burguer-red text-white hover:bg-burguer-darkRed btn-pulse"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length > visibleProducts && (
            <div className="flex justify-center mt-10">
              <button 
                onClick={handleShowMore}
                className="flex items-center gap-2 px-8 py-4 bg-burguer-gold hover:bg-yellow-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver Mais <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Product Detail Dialog with improved styling */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-bold text-burguer-red">{selectedProduct?.name}</DialogTitle>
            <DialogClose onClick={handleDialogClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <DialogDescription>Detalhes do produto</DialogDescription>

          {selectedProduct && (
            <div className="mt-4">
              <div className="w-full h-60 bg-cover bg-center rounded-md mb-4 border-2 border-burguer-red" 
                   style={{backgroundImage: `url(${selectedProduct.image})`}} />
              
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
              
              <div className="mt-2 mb-4 inline-block bg-gray-100 px-3 py-1 rounded-full">
                <span className="font-bold text-burguer-red">{selectedProduct.category}</span>
              </div>

              <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg">
                <div className="font-bold text-xl text-burguer-red">R$ {selectedProduct.price.toFixed(2)}</div>
                
                <div className="flex items-center bg-white rounded-full border border-gray-200 overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="mx-3 font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alguma observação sobre o pedido?
                </label>
                <textarea 
                  placeholder="Ex: Sem cebola, molho à parte..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-burguer-red focus:border-transparent"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleAddToCartFromDialog}
                className="w-full mt-4 bg-burguer-red hover:bg-burguer-darkRed text-lg py-6 font-medium"
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
