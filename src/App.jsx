import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import Description from './components/Description';
import Events from './components/Events';
import Footer from './components/Footer';
import LimenitaAgent from './components/LimenitaAgent';
import agentelime from './assets/agentelime.jpeg';
import ReservasTable from './components/ReservasTable';
import FormularioInvitadosCorporativo from './components/FormularioInvitadosCorporativo';
import AmbientesSlider from './components/AmbientesSlider';




//  LandingPage
//  activeSection controla qué sección extra está visible.
//  'inicio' → solo hero + description + events (default)
//  'carta'  → hero + description + events + Menu
const LandingPage = ({ inicioRef, cartaRef, activeSection }) => (
  <>
  {/* Sección INICIO — siempre montada */}
    <section ref={inicioRef}>
      <HeroSection />
      <Description />
      <Events />
      <AmbientesSlider />
    </section>
    
    {/* Sección CARTA — solo visible cuando activeSection === 'carta' */}
    {activeSection === 'carta' && (
      <section ref={cartaRef} className="py-20">
        <Menu />
      </section>
    )}
  </>
);

//  AppContent

function AppContent({ setLocale, locale }) {
   const [isAgentOpen, setIsAgentOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('inicio'); // Estado que controla la visibilidad
 
  const navigate  = useNavigate();
  const inicioRef = useRef(null);
  const cartaRef = useRef(null);

  //Scroll helpers

  const scrollToRef = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
 
  const ejecutarScroll = (id) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'carta') {
      // cartaRef existe solo cuando activeSection === 'carta'
      // Le damos un tick para que React monte el nodo antes de hacer scroll
      setTimeout(() => scrollToRef(cartaRef), 50);
    }
  };

  // Navegación principal
 const handleNavClick = (id) => {
    const cleanId = id.replace('#', '');
 
    
    if (cleanId === 'asistente') {
      navigate('/asistente');
      return;
    }
 
    
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        setActiveSection(cleanId);
        ejecutarScroll(cleanId);
      }, 150);
      return;
    }
      
 
    // INICIO → ocultar secciones extra + scroll al top
    if (cleanId === 'inicio') {
      setActiveSection('inicio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
 
    // Cualquier otra sección → activarla y hacer scroll
    setActiveSection(cleanId);
    ejecutarScroll(cleanId);
  };
 
 

  return (
    <div className="bg-limenita-taupe min-h-screen text-limenita-crema">
      <Navbar 
        setLocale={setLocale} 
        locale={locale} 
         onReservaClick={() => setIsAgentOpen(true)}
        onNavClick={handleNavClick} 
        activeSection={activeSection}
      />
      
      <Routes>
        <Route path="/" element={<LandingPage inicioRef={inicioRef} cartaRef={cartaRef} activeSection={activeSection} />} />
         <Route path="/asistente" element={<ReservasTable />} />
          <Route path="/formulario-invitados/:reservaId" element={<FormularioInvitadosCorporativo />} />
      </Routes>
      
      {/* Agente IA — siempre montado para preservar historial */}
      <LimenitaAgent
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
        avatarSrc={agentelime}
      />
      <Footer />
    </div>
  );
}
//  App — envuelve en BrowserRouter para habilitar useNavigate
function App({ setLocale, locale }) {
  return (
    
    <BrowserRouter>
      <AppContent setLocale={setLocale} locale={locale} />
    </BrowserRouter>
    
  );
}

export default App;