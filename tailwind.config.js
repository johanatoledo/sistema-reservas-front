/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'limenita-taupe': '#8C7B5D',    // El fondo de tu logo
        'limenita-crema': '#F3E5DC',   // El color de la letra del logo
        'limenita-madera': '#4A3E31',  // Para textos y bordes
        'limenita-zafiro': '#2B4E9E',  // El azul de tus sillas (Acento)
        'limenita-oro': '#C5A059' ,     // El dorado de las mesas
        'limenita-black': '#000000',   // Para textos oscuros
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Cardo', 'serif'],
      },
      backgroundImage: {
        'damasco': "url('/src/assets/texture/damasco-limeñita.jpeg')",
      }
    },
  },
  plugins: [],
}
