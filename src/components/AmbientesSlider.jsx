import React, { useState, useEffect } from 'react';
import 'keen-slider/keen-slider.min.css';
import s4m4 from '/environments/s4m4.jpg';
import s3 from '/environments/s3.jpg';
import box1 from '/environments/box-1.jpeg';


const environments = [
  {
    name: 'Salones',
    description: 'Ambientes tranquilos con decoración tradicional limeña, ideales para almuerzos y cenas familiares.',
    image: s4m4,
  },
  {
    name: 'Salón Principal',
    description: 'Espacio señorial con decoración limeña y mesas amplias.',
    image: s3,
  },
  {
    name: 'Terraza',
    description: 'Ambientes disponibles para disfrutar en familia y amigos domingos de tradicion limeña.',
    image: box1,
  },
];

const EnvironmentsSlider = () => {
  // Simple slider, can be improved with KeenSlider or Swiper
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % environments.length);
    }, 4000); // Cambia de imagen cada 4 segundos
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % environments.length);
  const prev = () => setCurrent((current - 1 + environments.length) % environments.length);

  return (
    <section id="ambientes" className="py-16 bg-limenita-taupe bg-damasco bg-repeat">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl text-limenita-crema mb-8 text-center">AMBIENTES DISPONIBLES</h2>
        <div className="relative flex items-center justify-center">
          <div className="mx-12 w-full md:w-2/3 bg-limenita-madera/80 rounded-lg overflow-hidden flex flex-col">
            <img src={environments[current].image} alt={environments[current].name} className="w-full h-80 md:h-96 object-cover" />
            <div className="p-6 w-full text-center">
              <h3 className="font-display text-2xl text-limenita-crema mb-2">{environments[current].name}</h3>
              <p className="font-body text-limenita-crema text-lg">{environments[current].description}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {environments.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full ${i === current ? 'bg-limenita-zafiro' : 'bg-limenita-oro/40'}`}></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnvironmentsSlider;
