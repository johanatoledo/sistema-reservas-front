import React from 'react';
import entrada from '../assets/entrada.jpg';

/**
 * Componente Description:
 * Muestra el texto de la casona a la izquierda y la imagen del show a la derecha.
 */

const Description = ({ imageSrc = entrada, imageAlt = 'Show de Danza Limeñita' }) => {
  return (
    <section className="w-full bg-limenita-crema/5 flex flex-col md:flex-row items-center justify-center py-20 px-6 md:px-12 gap-12 border-y border-limenita-oro/10">
      {/* Columna de Texto: Se lee primero en móvil y escritorio */}
      <div className="flex-1 order-2 md:order-1">
        <div className="max-w-2xl font-body text-limenita-crema/90 text-lg leading-relaxed">
         <p className="text-justify">En el corazón del Centro de Lima, dentro de una casona republicana, vive <span className="text-limenita-madera italic">Limeñita</span>: una apasionada de la buena mesa y los grandes encuentros. Aquí, ella abre las puertas de su hogar para invitarte a disfrutar de la cocina que la inspira: esa que nace del fogón criollo, se sazona con cariño y se sirve con orgullo.</p><br />
         <p className="text-justify">Cada plato en nuestra carta es una celebración de nuestras raíces , una mezcla de tradición y creatividad que recorre sabores de la costa, la sierra y la selva.</p> <br />       
         <p className="text-justify">Es la forma en que <span className="text-limenita-madera italic">Limeñita</span> comparte recuerdos, honra recetas de antaño y le da su toque personal a lo que mas ama:recibir, compartir y hacerte sentir como en casa.</p><br />
         <p className="text-justify">Te invitamos a ser parte de esta experiencia, a sentarte en nuestra mesa y descubrir por qué cada bocado en <span className="text-limenita-madera italic">Limeñita</span> es un viaje al corazón de Lima.</p>
        </div>
      </div>

      {/* Columna de Imagen con estilo sofisticado */}
      <div className="flex-1 flex justify-center order-1 md:order-2">
        <div className="relative group">
          {/* Marco decorativo dorado sutil */}
          <div className="absolute -inset-2 border border-limenita-oro/30 rounded-sm translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500"></div>
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="relative z-10 rounded-sm shadow-2xl max-w-full h-[400px] object-cover border-4 border-limenita-taupe grayscale-[30%] hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default Description;