import React from "react";

const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com/limenitarestaurante",
    icon: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle mr-2">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
    user: "@limenitarestaurante"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/limenita.restaurante",
    icon: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle mr-2">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.808 2.256 6.088 2.243 6.497 2.243 12c0 5.503.013 5.912.072 7.192.059 1.276.353 2.449 1.32 3.416.967.967 2.14 1.261 3.416 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.276-.059 2.449-.353 3.416-1.32.967-.967 1.261-2.14 1.32-3.416.059-1.28.072-1.689.072-7.192 0-5.503-.013-5.912-.072-7.192-.059-1.276-.353-2.449-1.32-3.416C19.397.425 18.224.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
    user: "@limenita.restaurante"
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@limenitarestaurante",
    icon: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="inline-block align-middle mr-2">
        <path d="M12.75 2a1 1 0 0 0-1 1v13.25a2.25 2.25 0 1 1-2.25-2.25 1 1 0 1 0 0-2 4.25 4.25 0 1 0 4.25 4.25V8.56a6.97 6.97 0 0 0 4.25 1.44 1 1 0 1 0 0-2 4.97 4.97 0 0 1-4.25-4.94V3a1 1 0 0 0-1-1z" />
      </svg>
    ),
    user: "@limenitarestaurante"
  }
];

const Footer = () => (
  <footer className="bg-limenita-taupe border-t border-limenita-oro/20 py-10 mt-16 text-limenita-crema">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Redes sociales */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="font-display text-xl mb-2">Síguenos</span>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-limenita-madera transition-all duration-300"
            >
              {link.icon}
              <span className="hidden sm:inline font-body text-base">{link.user}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Créditos y copyright */}
      <div className="flex flex-col items-center md:items-end gap-2 text-sm">
        <span>
          Creado por{' '}
          <a
            href="https://toledanadev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-limenita-oro hover:underline font-semibold"
          >
            www.tonatech.com
          </a>
        </span>
        <span>&copy; {new Date().getFullYear()} Limeñita. Todos los derechos reservados.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
