
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
