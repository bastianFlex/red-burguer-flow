
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartButton, { CartItem } from "../components/CartButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Contato = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Retornaremos em breve.",
      variant: "default",
      className: "bg-burguer-darkRed text-white"
    });
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      mensagem: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contato</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-burguer-red mb-4">Fale Conosco</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burguer-red"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burguer-red"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burguer-red"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burguer-red"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-burguer-red hover:bg-burguer-darkRed text-white font-medium py-2 rounded-md"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-burguer-red mb-4">Informações</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Endereço</h3>
                  <p className="text-gray-700">Rua dos Hambúrgueres, 123<br/>Bairro Gourmet<br/>São Paulo - SP</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Horário de Funcionamento</h3>
                  <p className="text-gray-700">
                    Segunda a Quinta: 11h às 22h<br/>
                    Sexta e Sábado: 11h às 23h<br/>
                    Domingo: 11h às 21h
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Contato</h3>
                  <p className="text-gray-700">
                    Telefone: (11) 99999-9999<br/>
                    E-mail: contato@redburguer.com<br/>
                    Instagram: @redburguer
                  </p>
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

export default Contato;
