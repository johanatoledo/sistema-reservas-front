import React, { useRef, useEffect } from 'react';
import baileShow from '../assets/videos/baileShow.MP4';




/**
 * Componente Eventos:
 * Muestra la imagen a la izquierda y el texto descriptivo a la derecha.
 */
const Eventos = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Ajusta la velocidad aquí (1 es normal, 0.5 es el doble de lento)
    }
  }, []);

  return (
    <section className="w-full bg-limenita-crema/5 flex flex-col md:flex-row items-center justify-center py-20 px-6 md:px-12 gap-12 border-y border-limenita-oro/10">
      {/* Columna de Imagen con estilo sofisticado */}
      <div className="flex-1 flex justify-center order-1 md:order-1">
        <div className="relative group w-full max-w-[500px] lg:max-w-[400px] aspect-square">
          {/* Marco decorativo dorado sutil */}
          <div className="absolute -inset-2 border border-limenita-oro/30 rounded-sm translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-15"></div>
          {/* Contenedor del video con overflow-hidden para recortar */}
          <div className="relative z-10 w-full h-full rounded-sm shadow-2xl border-4 border-limenita-taupe overflow-hidden grayscale-[30%] hover:grayscale-0 transition-all duration-10">
            <video 
              ref={videoRef}
              src={baileShow} 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.9]"
            />
          </div>
        </div>
      </div>
      {/* Columna de Texto:a la derecha */}
      <div className="flex-1 order-2 md:order-2">
        <div className="max-w-2xl font-body text-limenita-crema/50 text-lg md:text-l leading-loose space-y-6">
          <p className="text-justify">En <span className="text-limenita-madera italic">Limeñita</span>, los eventos especiales se viven con el mismo espíritu festivo y acogedor que caracteriza nuestra casa. Nuestro show de danzas típicas es una experiencia vibrante que celebra la riqueza cultural del Perú, fusionando música, color y tradición en cada presentación.</p>
          <p className="text-justify">Ya sea para una ocasión familiar, una reunión de amigos o un evento corporativo, en <span className="text-limenita-madera italic">Limeñita</span> encontrarás el escenario perfecto para compartir momentos inolvidables. Nuestro equipo se encarga de cada detalle para que tú solo te preocupes por disfrutar.</p>
          <p className="text-justify">Ven todos los domingos  y déjate sorprender por la magia de la danza, la gastronomía y la hospitalidad limeña en un solo lugar.</p>
        </div>
      </div>
    </section>
  );
};

export default Eventos;
