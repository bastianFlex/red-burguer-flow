
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartButton from "../components/CartButton";

const Sobre = () => {
  const [cartItems, setCartItems] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sobre Nós</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-burguer-red mb-4">Nossa História</h2>
                <p className="text-gray-700 mb-4">
                  O Red Burguer nasceu em 2015, da paixão de dois amigos pela gastronomia e hambúrgueres artesanais. 
                  O que começou como um food truck, hoje é uma das hamburguerias mais queridas da cidade.
                </p>
                <p className="text-gray-700">
                  Nossa missão é proporcionar a melhor experiência em hambúrgueres artesanais, 
                  com ingredientes frescos, pães artesanais e molhos exclusivos feitos na casa.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-burguer-red mb-4">Nossos Valores</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Qualidade sem compromissos nos ingredientes</li>
                  <li>Atendimento caloroso e familiar</li>
                  <li>Inovação constante em nosso cardápio</li>
                  <li>Respeito ao meio ambiente e práticas sustentáveis</li>
                  <li>Compromisso com a comunidade local</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-burguer-red mb-4">Nossa Equipe</h2>
                <p className="text-gray-700">
                  Contamos com uma equipe apaixonada por gastronomia, treinada para oferecer 
                  a melhor experiência desde o preparo dos alimentos até o atendimento.
                  Nosso chef executivo possui mais de 15 anos de experiência em cozinhas 
                  internacionais e traz esse conhecimento para criar hambúrgueres únicos e saborosos.
                </p>
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

export default Sobre;
