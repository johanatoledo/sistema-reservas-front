
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// AVIF
import causaAvif from '../assets-optimized/plates-drinks/causa.avif';
import cevicheAvif from '../assets-optimized/plates-drinks/ceviche.avif';
import lomosaltadoAvif from '../assets-optimized/plates-drinks/lomosaltado.avif';
import postrelimenoAvif from '../assets-optimized/plates-drinks/postres-limeña.avif';
import picaronesAvif from '../assets-optimized/plates-drinks/picarones-limeños.avif';
import pulpOlivoAvif from '../assets-optimized/plates-drinks/pulpo-al-olivo.avif';
import spaguettiLomoSaltadoAvif from '../assets-optimized/plates-drinks/spaguetti-lomosaltado.avif';
import bebidasnaturalesAvif from '../assets-optimized/plates-drinks/bebidasnaturales.avif';
import coctelesAvif from '../assets-optimized/plates-drinks/cocteles.avif';
import tonicAvif from '../assets-optimized/plates-drinks/tonic.avif';
import chilcanoAvif from '../assets-optimized/plates-drinks/chilcano.avif';
import coctelAvif from '../assets-optimized/plates-drinks/coctel.avif';
import piscosourAvif from '../assets-optimized/plates-drinks/pisco-sour.avif';


// WEBP
import causaWebp from '../assets-optimized/plates-drinks/causa.webp';
import cevicheWebp from '../assets-optimized/plates-drinks/ceviche.webp';
import lomosaltadoWebp from '../assets-optimized/plates-drinks/lomosaltado.webp';
import postrelimenoWebp from '../assets-optimized/plates-drinks/postres-limeña.webp';
import picaronesWepb from '../assets-optimized/plates-drinks/picarones-limeños.webp';
import pulpOlivoWepb from '../assets-optimized/plates-drinks/pulpo-al-olivo.webp';
import spaguettiLomoSaltadoWepb from '../assets-optimized/plates-drinks/spaguetti-lomosaltado.webp';
import bebidasnaturalesWebp from '../assets-optimized/plates-drinks/bebidasnaturales.webp';
import coctelesWebp from '../assets-optimized/plates-drinks/cocteles.webp';
import tonicWebp from '../assets-optimized/plates-drinks/tonic.webp';
import chilcanoWebp from '../assets-optimized/plates-drinks/chilcano.webp';
import coctelWebp from '../assets-optimized/plates-drinks/coctel.webp';
import piscosourWepb from '../assets-optimized/plates-drinks/pisco-sour.webp';



const IMAGES = {
  causa: { avif: causaAvif, webp: causaWebp },
  ceviche: { avif: cevicheAvif, webp: cevicheWebp },
  lomosaltado: { avif: lomosaltadoAvif, webp: lomosaltadoWebp },
  postrelimeno: { avif: postrelimenoAvif, webp: postrelimenoWebp },
  picarones: { avif: picaronesAvif, webp: picaronesWepb },
  pulpOlivo: { avif: pulpOlivoAvif, webp: pulpOlivoWepb },
  spaguettiLomoSaltado: { avif: spaguettiLomoSaltadoAvif, webp: spaguettiLomoSaltadoWepb },
  piscosour: { avif: piscosourAvif, webp: piscosourWepb },
  bebidasnaturales: { avif: bebidasnaturalesAvif, webp: bebidasnaturalesWebp },
  cocteles: { avif: coctelesAvif, webp: coctelesWebp },
  tonic: { avif: tonicAvif, webp: tonicWebp },
  chilcano: { avif: chilcanoAvif, webp: chilcanoWebp },
  coctel: { avif: coctelAvif, webp: coctelWebp },
};



const menuData = {
  'Sabores que dan La Bienvenida': [
    { name: 'OCOPA LIMEÑA', description: 'Papa Amarilla con nuestra clasica salsa huacatay,queso fresco,huevo y aceituna, con toques dulces', price: 20, photo: IMAGES.causa },
    { name: 'PAPA A LA HUANCAINA', description: 'Clásica y sabrosa, preparada con ají amarillo cremoso y queso fresco. Porción generosa para compartir', price: 20, photo: IMAGES.causa },
    { name: 'CAUSA LIMEÑA', description: 'Suave masa de papa amarilla mangueada, rellena con pollo en mayonesa casera. Acompañada con palta,aceituna,huevito de codorniz, hilos de camote crocante', price: 25, photo: IMAGES.causa },
    { name: 'ENCUENTRO ANDINO', description: 'Papas bañadas en salsa huancaína y ocopa', price: 23, photo: IMAGES.causa },
    { name: 'PAPA RELLENA', description: 'De carne picada,aceituna y huevo: empanizada al panko. Servida sobre un espejo de huancaína y ocopa, y una ensalada criolla', price: 25, photo: IMAGES.causa },
    { name: 'CHORITOS A LA CHALACA', description: 'Choritos frescos con cebolla, tomate, choclo y limón, bañados en su toque picante. Refrescantes y llenos de sabor marino.', price: 30, photo: IMAGES.causa }, 
    { name: 'CONCHAS AL FUEGO', description: 'Conchas frescas gratinadas con mantequilla, ajo y queso paria derretido. Un bocado intenso que une mar y sierra', price: 35, photo: IMAGES.causa },
    { name: 'PULPO AL OLIVO', description: 'Pulpo tierno con crema de aceitunas negras y un toque acevichado. Acompañado de galletas de soda y palta para equilibrar sabores.', price: 45, photo: IMAGES.pulpOlivo },
],
  'Herencia Marina': [
    { name: 'LECHE DE TIGRE', description: 'Jugo de ceviche a base ded ají amarillo y pasta de rocoto, acompañado de chicharron de pota.', price: 25, photo: IMAGES.ceviche },
    { name: 'CEVICHE DE PESCADO', description: 'Pescado del día marinado al limón y ají limo, acompañado de cebolla en juliana, choclo y camote dulce.', price: 45, photo: IMAGES.ceviche },
    { name: 'CHICHARRON DE PESCADO', description: 'Trozo de pescado crocantes al panko, acompañado de yuca frita, sarsa criolla y tártara.', price: 40, photo: IMAGES.ceviche },
    { name: 'SPAGUETTI MAR Y TIERRA', description: 'Spaguetti con mariscos y champiñones en salsa cremosa, gratinados con parmesano.', price: 40, photo: IMAGES.ceviche },
    { name: 'CAUSA DE PESCADO CON LANGOSTINOS CROCANTES', description: 'Causa limeña de papa mangueada, acompañada de pescado con mayonesa, coronada con langostinos crocantes y chips de papas nativas, bañada en leche de tigre de rocoto y ají amarillo.', price: 40, photo: IMAGES.ceviche },  
    { name: 'CEVICHE CONCHAS NEGRAS', description: 'Conchas negras frescas marinadas en limón con cebolla, ají limo y culantro. Sabor intenso y salino, con un toque norteño y chicharrón de pota', price: 50, photo: IMAGES.ceviche },
    { name: 'CHAUFA DE MARISCOS', description: 'Mixtura de mariscos salteados al wok', price: 37, photo: IMAGES.ceviche },
    { name: 'ARROZ CON MARISCOS', description: 'Arroz cremoso, salteado con mezcla de mariscos en una deliciosa salsa criolla', price: 40, photo: IMAGES.ceviche },
    { name: 'DUO MARINO 1', description: 'Ceviche clásico + arroz con mariscos', price: 45, photo: IMAGES.ceviche },
    { name: 'DUO MARINO 2', description: ' Ceviche clásico + chaufa de mariscos', price: 45, photo: IMAGES.ceviche },
    { name: 'DUO MARINO 3', description: ' Ceviche clásico + chicharrón de pescado', price: 50, photo: IMAGES.ceviche},
  ],
  'La mesa de Limenita': [
    { name: 'SPAGHETTI A LA HUANCAINA CON LOMO SALTADO', description: 'Lomo fino, servido sobre unos cremosos spaghetti a la huancaína.', price: 55, photo: IMAGES.spaguettiLomoSaltado },
    { name: 'CHAUFA CON PANCETA EN SALSA ORIENTAL', description: 'Chaufa con panceta crujiente en salsa oriental dulce, con el toque del wok que realza su sabor', price: 35, photo: IMAGES.lomosaltado },
    { name: 'SECO NORTEÑO', description: 'Asado de tira de res acompañado con cremosos frejoles y arroz', price: 55, photo: IMAGES.lomosaltado },
    { name: 'MILANESA LIMEÑITA A LO POBRE', description: 'Milanesa de lomo fino con arroz, papas nativas fritas, plátano y huevo frito', price: 50, photo: IMAGES.lomosaltado },
    { name: 'CHAUFA AMAZÓNICO', description: 'Cecina, chorizo amazónico y plátano frito salteados al wok, acompañado con ají de cocona y huevito a la inglesa', price: 38, photo: IMAGES.lomosaltado },
    { name: 'AJI DE POLLO', description: 'En un punto. Bien cremoso, acompañado con papas, huevo, aceituna y arroz', price: 35, photo: IMAGES.lomosaltado },
    { name: 'POLLO CRIOLLO AL ESTILO LIMEÑITA', description: 'Servido con papas nativas, choclito y ensalada mixta de col, acompañado con una salsa de ocopa', price: 35, photo: IMAGES.lomosaltado },
    { name: 'ARROZ CON PATO', description: 'Preparado al estilo del norte, con culantro fresco, ají amarillo y loche. Servido con pato jugoso y su infaltable chalaquita criolla', price: 60, photo: IMAGES.lomosaltado },
    { name: 'LOMO SALTADO CLÁSICO', description: 'Lomo fino salteado con verduras, acompañado de papas nativas fritas y arroz', price: 50, photo: IMAGES.lomosaltado },
  ],
  'El Broche de Oro': [ 
    { name: 'PICARONES', description: 'Tradicionales y bañados en miel chancaca.', price: 19, photo: IMAGES.picarones },
    { name: 'HELADO DE TEMPORADA', description: 'Artesanal y refrescante, acompañado de trozos de brownie.', price: 20, photo: IMAGES.postrelimeno },
    { name: 'TARTA DE QUESO', description: 'Suave y cremosa, elaborada con mezcla de quesos peruanos sobre base crocante de galleta.', price: 25, photo: IMAGES.postrelimeno },
    { name: 'CORAZÓN LIMEÑITA', description: 'Corazón de chocolate relleno con suspiro de chirimoya.', price: 28, photo: IMAGES.postrelimeno},
    { name: 'CHURROS CON HELADO', description: 'Crujientes churros recien hechos, espolvoreados con azúcar y canela, servidos con una bola  de helado de tiramisú.', price: 20, photo: IMAGES.postrelimeno },
  ],
  'Guarniciones': [
    { name: 'GUARNICION 1', description: 'Arroz blanco con choclito', price: 8 },
    { name: 'GUARNICION 2', description: 'Porción de yucas.', price: 10 },
    { name: 'GUARNICION 3', description: 'Porción de papas fritas.', price: 10 },
    { name: 'GUARNICION 4', description: 'Salsa Huancaína.', price: 5 },
  ],
  'Bebidas': [
    { name: 'LIMONADA', description: 'Natural', price: 8, photo: IMAGES.bebidasnaturales },
    { name: 'LIMONADA ', description: 'Fronzen', price: 12, photo:  IMAGES.bebidasnaturales },
    { name: 'MARACUYA', description: 'Natural', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'MARACUYA', description: 'Fronzen', price: 12, photo:  IMAGES.bebidasnaturales },
    { name: 'CHICHA MORADA', description: 'Natural', price: 10, photo:  IMAGES.bebidasnaturales },
    { name: 'CHICHA MORADA', description: 'Fronzen', price: 15, photo:  IMAGES.bebidasnaturales },
    { name: 'AGUA MUNAY', description: 'Con o sin gas 300 ml', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'AGUA MUNAY', description: 'Con o sin gas 500 ml', price: 10, photo:  IMAGES.bebidasnaturales },
    { name: 'GASEOSA COCA COLA', description: 'Helada o sin helar', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'GASEOSA INCAKOLA', description: 'Helada o sin helar', price: 8, photo:  IMAGES.bebidasnaturales },
    { name: 'LIMONADA AFRUTADA', description: 'Natural con tres sabores a elegir:Fresa-Menta-Hierba Luisa', price: 10, photo:  IMAGES.bebidasnaturales },
    { name: 'LIMONADA AFRUTADA', description: 'Fronzen con tres sabores a elegir:Fresa-Menta-Hierba Luisa', price: 10, photo:  IMAGES.bebidasnaturales },
    
  ],
  'Infusiones': [
    { name: 'FRUTOS ROJOS', description: 'Infusión de frutos rojos', price: 10 },
    { name: 'INFUSIONES LA FIDELIA', description: 'Diferentes sabores', price: 10 },
  ],
  'Cocteles Limeños': [
    { name: 'SMOKED SOUR', description: 'Pisco Pago de los Frailes by Portón macerado en canela, agave de los Andes, licor de cacao, lima limón, piña grillada y clara', price: 39, photo: IMAGES.cocteles },
    { name: 'CHILCANO LIMEÑO', description: 'Pisco Pago de los Frailes by Portón, estrujado en cáscaras de lima, aguaymanto y ginger ale', price: 29, photo: IMAGES.tonic },
    { name: 'PISCO PUNCH SPICED', description: 'Pisco Pago de los Frailes by Portón, especias, piña y albahaca.', price: 33, photo: IMAGES.chilcano },
    { name: 'TROPICAL TEA PUNCH', description: 'Pisco Pago de los Frailes by Portón, té frío, maracumango', price: 39, photo: IMAGES.tonic },
    { name: 'NEGRONI DARK', description: 'Ron Bacardi añejo, Campari, Cinzano 1757 y Pedro Ximénez oloroso.', price: 39, photo: IMAGES.cocteles },
    { name: 'MARGARITA MILAGROSA', description: 'Tequila Espolón, kiwi, leche de coco, triple sec y blueberries', price: 39, photo: IMAGES.chilcano },
  ],
  'Cocteles Clasicos': [
    { name: 'APEROL SPRITZ', description: 'Aperol, Cinzano prosecco y soda.', price: 29, photo: IMAGES.cocteles },
    { name: 'SERVULO', description: 'Aperol, Pisco Portón aromático, licor de cherry y Cinzano Blanco.', price: 29, photo: IMAGES.tonic },
    { name: 'CAPITAN', description: '', price: 29, photo: IMAGES.chilcano },
    { name: 'ALGARROBINA', description: '', price: 25, photo: IMAGES.coctel},
    { name: 'PISCO SOUR', description: '', price: 28, photo: IMAGES.piscosour },
    { name: 'CHILCANO CLASICO', description: '', price: 22, photo: IMAGES.bebidasnaturales },
    { name: 'CHILCANO DE MARACUYA', description: '', price: 25, photo: IMAGES.chilcano},
    { name: 'CUBA LIBRE', description: '', price: 24, photo: IMAGES.cocteles },
    { name: 'PIÑA COLADA', description: '', price: 29, photo: IMAGES.tonic },
      
  ],
  'Mocktails (sin alcohol)': [
    { name: 'ROJO PASION', description: 'Arándanos, camu camu, lima limón, agua tónica y clara de huevo.', price: 25, photo: IMAGES.chilcano },
    { name: 'ROJO PASION CON GIN', description: 'Arándanos, camu camu, lima limón, agua tónica,clara de huevo Y gin macerado en airampo y té. ', price: 35, photo: IMAGES.bebidasnaturales },
    { name: 'DELICIOSA VIRGEN', description: 'Kiwi, elderflower, lima limón y tónica blossom.', price: 25, photo: IMAGES.tonic },
  ],
  'Calientitos': [
    { name: 'TE PITEADO PALAIS', description: 'Whisky Johnnie Walker Red Label, piña grillada, frutos rojos y concentrado de de té de rosas y jazmín.', price: 38, photo: IMAGES.coctel },

  ],
  'Gins & Tonics (Perfect serve)': [
    { name: 'BOMBAY SAPPHIRE TONIC', description: 'Servido con una Tónica dry perfume de naranja y limón', price: 29, photo: IMAGES.coctel },
    { name: 'BOMBAY BRAMBLE TONIC', description: 'Servido con una Tónica dry, arándanos y fresas.', price: 30, photo: IMAGES.chilcano },
    { name: 'HENDRICKS TONIC', description: 'Servido con una Tónica dry y pepino kiuri.', price: 39, photo: IMAGES.tonic },
    { name: 'TANQUERAY LONDON DRY TONIC', description: 'Servido con una Tónica dry y rodaja de limón', price: 26, photo: IMAGES.bebidasnaturales },
    { name: 'AIRAMPO TEA TONIC', description: 'Gin macerado con airampo y té de frutos rojos, servido con una tónica blossom y frutos del bosque.', price: 29, photo: IMAGES.cocteles },
  ],
};

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