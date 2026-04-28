import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({  onNavClick, onReservaClick, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO',       id: 'inicio' },
    { name: 'NUESTRA CARTA', id: 'carta'  },
    { name: 'RESERVAR',      id: 'reserva', isButton: true },
    { name: 'VER RESERVAS',    id: 'asistente' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
      isScrolled
        ? 'bg-limenita-taupe/90 backdrop-blur-md py-2 border-limenita-oro/10'
        : 'bg-limenita-taupe py-4 border-limenita-oro/30'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo — clic vuelve a inicio */}
        <button
          onClick={() => onNavClick('inicio')}
          className="text-2xl md:text-3xl font-display text-limenita-crema tracking-[0.2em] bg-transparent border-none cursor-pointer"
        >
          LIMEÑITA
        </button>

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
                  link.isButton ? onReservaClick() : onNavClick(link.id);
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

      </div>
    </nav>
  );
};

export default Navbar;