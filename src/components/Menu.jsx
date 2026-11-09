
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '../data/menuData';

const Menu = () => {

  // Get categories for buttons
  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  // Framer Motion variants para animaciones suaves al cambiar de categoría
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Staggered animation for dishes
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section 
      id="carta" 
      className="relative py-20 bg-limenita-taupe overflow-hidden"
    >
      {/* 2. SOPHISTICATED DAMASK BACKGROUND (image_3.png) */}
      {/* Use a pseudo-element for the background with low opacity to avoid saturation */}
      <div 
        className="absolute inset-0 z-0 bg-repeat opacity-15"
      ></div>
      
      {/* Color overlay to ensure readability */}
      <div className="absolute inset-0 z-10 bg-limenita-taupe/80 backdrop-blur-[2px]"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl text-limenita-crema mb-4 text-center uppercase tracking-widest">
          NUESTRA CARTA
        </h2>
        <p className="font-body text-limenita-crema/80 text-center mb-8 max-w-2xl mx-auto">
          Un viaje culinario a través de la costa, sierra y selva, preservando las recetas tradicionales de nuestra casona.
        </p>

        {/* INDICADOR VISUAL DE SCROLL */}
        <div className="flex justify-center items-center gap-3 mb-4 text-limenita-oro text-xs font-body tracking-widest uppercase animate-pulse">
          <span>←</span>
          <span>Desliza para explorar</span>
          <span>→</span>
        </div>

        {/* 3. CATEGORY NAVIGATION (Elegant scrollable bar) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 mb-12 border-b border-limenita-oro/20 pb-6 px-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-limenita-oro/30 hover:[&::-webkit-scrollbar-thumb]:bg-limenita-oro/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {categories.map(cat => (
            <button
              key={cat}
              className={`snap-center flex-shrink-0 px-6 py-2.5 rounded-full font-body text-sm uppercase tracking-wider transition-all duration-300 whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-limenita-zafiro text-limenita-crema shadow-md scale-105 border border-limenita-zafiro' 
                  : 'text-limenita-crema/70 hover:text-limenita-oro hover:bg-limenita-crema/10 border border-transparent hover:border-limenita-oro/30'
                }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4. DYNAMIC DISH GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-6 max-w-4xl mx-auto"
          >
            {menuData[activeCategory].length > 0 ? (
              menuData[activeCategory].map((dish, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-limenita-crema flex flex-row group border-b border-limenita-oro/30 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden"
                >
                  {/* DISH PHOTO (Optional) */}
                  {dish.photo ? (
                    <div className="w-1/3 md:w-48 h-auto min-h-[120px] overflow-hidden relative flex-shrink-0">
                      <picture>
                        <source srcSet={dish.photo.avif} type="image/avif" />
                        <source srcSet={dish.photo.webp} type="image/webp" /> 
                        <img 
                          src={dish.photo.webp}
                          alt={dish.name} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                      </picture>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  ) : (
                    // Elegant placeholder if no photo
                    <div className="w-2 md:w-4 bg-gradient-to-b from-limenita-oro/40 to-transparent flex-shrink-0"></div>
                  )}

                  {/* DISH DETAILS */}
                  <div className="p-4 md:p-6 flex-grow flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                      <h3 className="font-display text-xl md:text-2xl text-limenita-madera leading-tight">
                        {dish.name}
                      </h3>
                      {/* PRICE (Gold style) */}
                      <span className="font-display text-lg md:text-2xl text-limenita-oro whitespace-nowrap font-bold">
                        S/ {dish.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {dish.description && (
                      <p className="font-body text-limenita-taupe text-sm md:text-base leading-relaxed">
                        {dish.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              // Empty state for categories without dishes yet
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-limenita-crema/10 rounded border border-dashed border-limenita-oro/30">
                <p className="font-body text-limenita-crema/60 text-lg">
                  Próximamente deliciosas opciones en {activeCategory}...
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Menu;