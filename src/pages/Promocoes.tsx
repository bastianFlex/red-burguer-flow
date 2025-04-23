
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartButton from "../components/CartButton";

const Promocoes = () => {
  const [cartItems, setCartItems] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Promoções</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-burguer-red mb-4">Promoções da Semana</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg">Combo Família</h3>
                <p className="text-gray-600">4 hambúrgueres + 2 porções de batatas + 2 refrigerantes</p>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="line-through text-gray-400">R$120,00</span>
                    <span className="text-burguer-red font-bold ml-2">R$99,90</span>
                  </div>
                  <button className="bg-burguer-red text-white px-4 py-2 rounded-md hover:bg-burguer-darkRed transition-colors">
                    Pedir agora
                  </button>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium text-lg">Terça do Burguer</h3>
                <p className="text-gray-600">Qualquer hambúrguer tradicional com 30% de desconto</p>
                <div className="mt-2">
                  <span className="text-burguer-red font-bold">Válido somente às terças-feiras</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">Feliz Hora</h3>
                <p className="text-gray-600">Bebidas com 50% de desconto das 18h às 20h</p>
                <div className="mt-2">
                  <span className="text-burguer-red font-bold">De segunda a sexta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <CartButton itemCount={cartItems} />
      <Footer />
    </div>
  );
};

export default Promocoes;
