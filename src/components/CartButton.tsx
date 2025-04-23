
import React, { useState } from "react";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Classic Burguer",
      price: 29.90,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
    }
  ]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    if (itemToRemove) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      
      toast({
        title: "Item removido",
        description: `${itemToRemove.name} foi removido do carrinho.`,
        variant: "default",
        className: "bg-red-600 text-white"
      });
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      {/* Floating Cart Button with enhanced visibility */}
      <button
        onClick={toggleCart}
        className={cn(
          "fixed bottom-6 right-6 z-40 bg-burguer-red text-white rounded-full p-4 shadow-lg",
          "hover:bg-burguer-darkRed transition-all duration-300 btn-pulse",
          "border-4 border-white",
          itemCount > 0 ? "animate-float" : ""
        )}
        aria-label="Abrir carrinho de compras"
      >
        <div className="relative">
          <ShoppingCart size={28} />
          {itemCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-burguer-gold text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {itemCount}
            </span>
          )}
        </div>
      </button>

      {/* Cart Panel with improved styling */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b bg-burguer-red text-white">
            <h2 className="font-poppins font-bold text-xl flex items-center">
              <ShoppingCart size={24} className="mr-2" /> Seu Carrinho
            </h2>
            <button
              onClick={toggleCart}
              className="p-1 rounded-full hover:bg-burguer-darkRed"
              aria-label="Fechar carrinho"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-lg bg-cover bg-center mr-3" 
                           style={{backgroundImage: `url(${item.image})`}} />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-500 hover:text-burguer-red p-1 bg-gray-100 rounded-full"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-500 hover:text-burguer-red p-1 bg-gray-100 rounded-full"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={14} />
                          </button>
                          <span className="text-gray-500 text-sm ml-2">
                            x R$ {item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-burguer-red font-bold">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="mt-2 flex items-center text-xs text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-full"
                        aria-label="Remover item"
                      >
                        <Trash2 size={14} className="mr-1" /> Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
                <p className="text-gray-400 text-sm mt-2">Adicione produtos ao carrinho para continuar</p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold text-lg">
                {cartItems.length > 0 ? `R$ ${calculateTotal().toFixed(2)}` : "R$ 0,00"}
              </span>
            </div>
            <Button 
              disabled={cartItems.length === 0}
              className={cn(
                "w-full font-poppins font-semibold py-6", 
                cartItems.length > 0 ? "bg-green-600 hover:bg-green-700 animate-pulse" : "bg-gray-300"
              )}
            >
              Finalizar Pedido
            </Button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Clique para finalizar seu pedido
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:z-30 animate-fade-in"
          onClick={toggleCart}
        />
      )}
    </>
  );
};

export default CartButton;
