import React from 'react';
import { motion } from 'framer-motion';
import bannerImg from '../assets/entrada1.jpg';

const HeroSection = () => {
  return (
    <section id="inicio" className="relative h-[100vh] flex items-end justify-center overflow-hidden pb-24 md:pb-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bannerImg} 
          alt="Casona Restaurante Limeñita" 
          className="w-full h-full object-cover brightness-40"
        />
      </div>

      {/* Overlay de textura damasco (con el color #8C7B5D que editamos) */}
      <div 
        className="absolute inset-0 z-10 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'var(--image-damasco-pattern)', backgroundRepeat: 'repeat' }}
      ></div>

      {/* Gradiente sutil inferior para asegurar legibilidad si la foto es clara abajo */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-limenita-taupe/80 via-transparent to-transparent"></div>

      {/* Contenido desplazado hacia abajo */}
      <motion.div 
        className="relative z-20 text-center px-4 mb-4"
      >
        <p className="text-xl md:text-3xl font-body text-limenita-crema/90 mb-2 max-w-3xl mx-auto italic drop-shadow-md">
          "Reserva tu mesa y vive la experiencia de la mejor gastronomía limeña"
        </p>

        
      </motion.div>
    </section>
  );
};

export default HeroSection;