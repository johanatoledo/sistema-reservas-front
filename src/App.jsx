import React, { useState, useRef, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Description from './components/Description';
import Events from './components/Events';
import Footer from './components/Footer';

import agentelime from './assets-optimized/agentelime.avif';

// Lazy loading
const Menu = lazy(() => import('./components/Menu'));
const LimenitaAgent = lazy(() => import('./components/LimenitaAgent'));
const ReservasTable = lazy(() => import('./components/ReservasTable'));
const FormularioInvitadosCorporativo = lazy(() =>
  import('./components/FormularioInvitadosCorporativo')
);
const AmbientesSlider = lazy(() => import('./components/AmbientesSlider'));

const Loader = () => (
  <div className="py-10 text-center text-limenita-crema">
    Cargando...
  </div>
);

const LandingPage = ({ inicioRef, cartaRef, activeSection }) => (
  <>
    <section ref={inicioRef}>
      <HeroSection />
      <Description />
      <Events />

      <Suspense fallback={<Loader />}>
        <AmbientesSlider />
      </Suspense>
    </section>

    {activeSection === 'carta' && (
      <section ref={cartaRef} className="py-20">
        <Suspense fallback={<Loader />}>
          <Menu />
        </Suspense>
      </section>
    )}
  </>
);

function AppContent({ setLocale, locale }) {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navigate = useNavigate();
  const location = useLocation();

  const inicioRef = useRef(null);
  const cartaRef = useRef(null);

  const isFormularioInvitados = location.pathname.startsWith('/formulario-invitados');

  const scrollToRef = useCallback((ref) => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const ejecutarScroll = useCallback((id) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'carta') {
      requestAnimationFrame(() => {
        setTimeout(() => scrollToRef(cartaRef), 50);
      });
    }
  }, [scrollToRef]);

  const handleNavClick = useCallback((id) => {
    const cleanId = id.replace('#', '');

    if (cleanId === 'asistente') {
      navigate('/asistente');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        setActiveSection(cleanId);
        ejecutarScroll(cleanId);
      }, 150);

      return;
    }

    if (cleanId === 'inicio') {
      setActiveSection('inicio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveSection(cleanId);
    ejecutarScroll(cleanId);
  }, [navigate, location.pathname, ejecutarScroll]);

  return (
    <div className="bg-limenita-taupe min-h-screen text-limenita-crema">
      {!isFormularioInvitados && (
        <Navbar
          setLocale={setLocale}
          locale={locale}
          onReservaClick={() => setIsAgentOpen(true)}
          onNavClick={handleNavClick}
          activeSection={activeSection}
        />
      )}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                inicioRef={inicioRef}
                cartaRef={cartaRef}
                activeSection={activeSection}
              />
            }
          />

          <Route path="/asistente" element={<ReservasTable />} />

          <Route
            path="/formulario-invitados/:reservaId"
            element={<FormularioInvitadosCorporativo />}
          />
        </Routes>
      </Suspense>

      {!isFormularioInvitados && isAgentOpen && (
        <Suspense fallback={null}>
          <LimenitaAgent
            isOpen={isAgentOpen}
            onClose={() => setIsAgentOpen(false)}
            avatarSrc={agentelime}
          />
        </Suspense>
      )}

      {!isFormularioInvitados && <Footer />}
    </div>
  );
}

function App({ setLocale, locale }) {
  return (
    <BrowserRouter>
      <AppContent setLocale={setLocale} locale={locale} />
    </BrowserRouter>
  );
}

export default App;