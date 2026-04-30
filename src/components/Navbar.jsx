import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Instala lucide-react o usa SVGs

const Navbar = ({ onNavClick, onReservaClick, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', id: 'inicio' },
    { name: 'NUESTRA CARTA', id: 'carta' },
    { name: 'RESERVAR', id: 'reserva', isButton: true },
    { name: 'VER RESERVAS', id: 'asistente' },
  ];

  const handleLinkClick = (link) => {
    setIsOpen(false); // Cerrar menú al hacer clic
    if (link.isButton) {
      onReservaClick();
    } else {
      onNavClick(link.id);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
      isScrolled
        ? 'bg-limenita-taupe/90 backdrop-blur-md py-2 border-limenita-oro/10'
        : 'bg-limenita-taupe py-4 border-limenita-oro/30'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <button
          onClick={() => onNavClick('inicio')}
          className="text-2xl md:text-3xl font-display text-limenita-crema tracking-[0.2em] bg-transparent border-none cursor-pointer"
        >
          LIMEÑITA
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 font-body text-limenita-crema uppercase text-sm tracking-widest">
          {navLinks.map((link) => {
            const isActive = !link.isButton && activeSection === link.id;
            return (
              <motion.button
                key={link.id}
                whileHover={!link.isButton ? { scale: 1.1 } : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className={`transition-all duration-300 bg-transparent border-none cursor-pointer ${
                  link.isButton
                    ? 'bg-limenita-zafiro text-limenita-crema px-8 py-2.5 rounded-sm shadow-lg hover:bg-limenita-madera'
                    : isActive
                      ? 'text-limenita-oro border-b border-limenita-oro pb-0.5'
                      : 'text-limenita-crema hover:text-limenita-oro'
                }`}
              >
                {link.name}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-limenita-crema focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-limenita-taupe border-t border-limenita-oro/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6 font-body text-limenita-crema uppercase text-center tracking-[0.15em]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className={`text-lg ${
                    link.isButton 
                      ? 'bg-limenita-zafiro py-3 rounded-sm text-white' 
                      : 'py-2 border-b border-limenita-oro/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;