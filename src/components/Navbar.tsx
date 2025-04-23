
import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Animation demo for cart
  const addToCart = () => {
    setCartItemCount(prev => prev + 1);
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
      cartIcon.classList.add("animate-shake");
      setTimeout(() => {
        cartIcon.classList.remove("animate-shake");
      }, 500);
    }
    
    toast({
      title: "Item adicionado ao carrinho",
      description: "Produto adicionado com sucesso!",
      variant: "default",
      className: "bg-burguer-darkRed text-white"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="mr-4 p-2 rounded-full hover:bg-burguer-light transition-colors duration-300 md:hidden ripple-effect"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center">
            <Link to="/" className="font-poppins font-bold text-2xl text-burguer-red">
              Red<span className="text-burguer-gold">Burguer</span>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="/" active={location.pathname === "/"}>Início</NavLink>
          <NavLink href="/cardapio" active={location.pathname === "/cardapio"}>Cardápio</NavLink>
          <NavLink href="/promocoes" active={location.pathname === "/promocoes"}>Promoções</NavLink>
          <NavLink href="/sobre" active={location.pathname === "/sobre"}>Sobre Nós</NavLink>
          <NavLink href="/contato" active={location.pathname === "/contato"}>Contato</NavLink>
          <NavLink href="/mais-vendidos" active={location.pathname === "/mais-vendidos"}>Mais Vendidos</NavLink>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed top-[61px] left-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col p-4 space-y-4">
            <NavLink href="/" active={location.pathname === "/"}>Início</NavLink>
            <NavLink href="/cardapio" active={location.pathname === "/cardapio"}>Cardápio</NavLink>
            <NavLink href="/promocoes" active={location.pathname === "/promocoes"}>Promoções</NavLink>
            <NavLink href="/sobre" active={location.pathname === "/sobre"}>Sobre Nós</NavLink>
            <NavLink href="/contato" active={location.pathname === "/contato"}>Contato</NavLink>
            <NavLink href="/mais-vendidos" active={location.pathname === "/mais-vendidos"}>Mais Vendidos</NavLink>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-burguer-light transition-colors duration-300 ripple-effect"
              onClick={() => window.location.href = "/cardapio"}
            >
              <Search size={22} />
            </button>
          </div>
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-burguer-light transition-colors duration-300 ripple-effect"
              onClick={addToCart}
            >
              <ShoppingCart id="cart-icon" size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-burguer-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, active, children }) => {
  return (
    <Link 
      to={href}
      className={cn(
        "relative font-medium hover:text-burguer-red transition-colors duration-300",
        "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0",
        "after:bg-burguer-red after:origin-bottom-right after:transition-transform after:duration-300",
        "hover:after:scale-x-100 hover:after:origin-bottom-left",
        active ? "text-burguer-red after:scale-x-100 after:origin-bottom-left" : "text-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
