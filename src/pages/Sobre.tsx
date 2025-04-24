
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartButton, { CartItem } from "../components/CartButton";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Sobre = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full mt-16">
        <div className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Sobre o Red<span className="text-burguer-gold">Burguer</span>
            </h1>
            <p className="text-white/80 max-w-xl">
              Uma história de paixão pela gastronomia e atendimento de qualidade
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pt-10 px-4">
        <div className="container mx-auto">
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-burguer-red mb-4">Nossa História</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-gray-700 mb-4">
                      O Red Burguer nasceu em 2015, da paixão de dois amigos pela gastronomia e hambúrgueres artesanais. 
                      O que começou como um food truck, hoje é uma das hamburguerias mais queridas da cidade.
                    </p>
                    <p className="text-gray-700">
                      Nossa missão é proporcionar a melhor experiência em hambúrgueres artesanais, 
                      com ingredientes frescos, pães artesanais e molhos exclusivos feitos na casa.
                    </p>
                  </div>
                  <div className="h-56 md:h-full rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Hamburger" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-burguer-red mb-4">Nossos Valores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Qualidade sem compromissos", "Atendimento caloroso", "Inovação constante", "Práticas sustentáveis", "Compromisso com a comunidade"].map((value, index) => (
                    <div key={index} className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors">
                      <div className="w-10 h-10 bg-burguer-red rounded-full flex items-center justify-center text-white font-bold mb-2">
                        {index + 1}
                      </div>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-burguer-red mb-4">Nossa Equipe</h2>
                  <p className="text-gray-700 mb-4">
                    Contamos com uma equipe apaixonada por gastronomia, treinada para oferecer 
                    a melhor experiência desde o preparo dos alimentos até o atendimento.
                  </p>
                  <p className="text-gray-700">
                    Nosso chef executivo possui mais de 15 anos de experiência em cozinhas 
                    internacionais e traz esse conhecimento para criar hambúrgueres únicos e saborosos.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-burguer-red/10 to-burguer-gold/10 p-6 rounded-lg border border-burguer-gold/20">
                  <h2 className="text-2xl font-semibold text-burguer-red mb-4">Venha nos visitar!</h2>
                  <p className="mb-4">Av. Paulista, 123 - São Paulo/SP</p>
                  <p className="mb-4">Segunda a domingo: 11h às 23h</p>
                  <p className="mb-6">Telefone: (11) 3456-7890</p>
                  <Link 
                    to="/contato" 
                    className="flex items-center text-burguer-red hover:text-burguer-darkRed transition-colors"
                  >
                    Entre em contato <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
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

export default Sobre;
