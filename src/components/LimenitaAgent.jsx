// src/components/chatbot/LimenitaAgent.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────
//  Mensaje inicial en local (sin llamada a la API aún)
// ─────────────────────────────────────────────────────────
const BIENVENIDA = {
  role: 'assistant',
  content:
    'Bienvenido a Limeñita. Es un placer atenderte. Me indica por favor que tipo de reserva desea realizar:Personal o Corporativa?',
};

// ─────────────────────────────────────────────────────────
//  Burbuja de mensaje
// ─────────────────────────────────────────────────────────
const Burbuja = ({ msg, avatarSrc }) => {
  const esBot = msg.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${esBot ? 'justify-start' : 'justify-end'}`}
    >
      {/* Avatar del agente — solo en mensajes del bot */}
      {esBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-limenita-oro shadow-md">
          <img
            src={avatarSrc}
            alt="Limeñita"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 text-sm font-body leading-relaxed shadow-sm ${
          esBot
            ? 'bg-white text-limenita-madera rounded-t-2xl rounded-br-2xl rounded-bl-sm border-l-4 border-limenita-zafiro'
            : 'bg-limenita-zafiro text-limenita-crema rounded-t-2xl rounded-bl-2xl rounded-br-sm'
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
//  Indicador de escritura (tres puntos animados)
// ─────────────────────────────────────────────────────────
const Typing = ({ avatarSrc }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex items-end gap-2 justify-start"
  >
    <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-limenita-oro shadow-md">
      <img src={avatarSrc} alt="Limeñita escribiendo" className="w-full h-full object-cover object-top" />
    </div>
    <div className="bg-white border-l-4 border-limenita-zafiro px-4 py-3 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
      <span className="flex gap-1 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-limenita-taupe inline-block"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </span>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────────────────
//  Componente principal
// ─────────────────────────────────────────────────────────
export default function LimenitaAgent({ isOpen, onClose, avatarSrc }) {
  const [messages, setMessages]       = useState([BIENVENIDA]);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [mostrarUpload, setMostrarUpload] = useState(false);
  const bottomRef                     = useRef(null);
  const inputRef                      = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Al abrir: bloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus en el input después de la animación de entrada
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Llamada al backend ─────────────────────────────────
  const llamarApi = useCallback(async (historial) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: historial.map(({ role, content }) => ({ role, content })),
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (data?.tool_called === 'activar_lista_invitados') {
      setMostrarUpload(true);
    }
    return (
      data?.result?.content ||
      'Disculpe, no pude procesar su solicitud. ¿Podría repetirla?'
    );
  }, []);

 
  
  // ── Envío de mensaje del usuario ─────────────────────
  const enviarMensaje = async (textoInput) => {
    const texto = (textoInput || input).trim();
    if (!texto || loading) return;

    const nuevoHistorial = [...messages, { role: 'user', content: texto }];
    setMessages(nuevoHistorial);
    setInput('');
    setLoading(true);

    try {
      const respuesta = await llamarApi(nuevoHistorial);
      setMessages((prev) => [...prev, { role: 'assistant', content: respuesta }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Disculpe, hubo un inconveniente técnico. Por favor intente de nuevo en un momento.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

   // ── Manejador de subida de archivos ─────────────────────
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('invitados', file);

  try {
    setLoading(true);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setMostrarUpload(false);
      
      // En lugar de enviar un mensaje visible, notificamos a la IA 
      // y añadimos un mensaje de confirmación amigable para el usuario.
      const confirmacionSistema = `Sistema: El archivo se subió con éxito. Nombre: ${data.fileName}.`;
      
      // Llamamos a enviarMensaje pasando el nombre del archivo 
      // para que la IA lo guarde en su contexto.
      await enviarMensaje(`He subido la lista de invitados correctamente. (Archivo: ${data.fileName})`);
    }
  } catch (error) {
    console.error("Error al subir archivo:", error);
    alert("Hubo un error al subir el archivo. Intente de nuevo.");
  } finally {
    setLoading(false);
  }
};

// ── Manejador de teclas ─────────────────────────────────────────────
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  // ── Render ─────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            className="fixed inset-0 z-40 bg-limenita-madera/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel del agente */}
          <motion.aside
            className="fixed bottom-0 right-0 z-50 flex flex-col w-full max-w-sm h-[90dvh] max-h-[680px] m-0 sm:m-6 sm:rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#F3E5DC' }} // limenita-crema
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >

            {/* ── HEADER ──────────────────────────────── */}
            <header className="relative flex items-center gap-3 px-4 py-3 bg-limenita-taupe flex-shrink-0">
            
              <div
                className="absolute inset-0 opacity-10 bg-repeat"
                style={{ background: '#F3E5DC'}}
              />

              {/* Avatar grande en el header */}
              <div className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-limenita-oro shadow-lg flex-shrink-0">
                <img
                  src={avatarSrc}
                  alt="Agente Limeñita"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="relative z-10 flex flex-col">
                <span className="font-display text-limenita-crema text-lg leading-tight">
                  Limeñita
                </span>
                <span className="font-body text-limenita-crema/70 text-xs tracking-wide">
                  Asistente del restaurante
                </span>
              </div>

              {/* Indicador online */}
              <div className="relative z-10 ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-limenita-crema/70 text-xs">En línea</span>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={onClose}
                aria-label="Cerrar chat"
                className="relative z-10 ml-3 w-7 h-7 flex items-center justify-center rounded-full bg-limenita-madera/30 hover:bg-limenita-madera/60 transition text-limenita-crema text-lg leading-none"
              >
                ×
              </button>
            </header>

            {/* ── MENSAJES ────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F3E5DC]"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, rgba(243,229,220,0.95), rgba(243,229,220,0.95)), url(/src/assets/texture/damasco-limeñita.jpeg)',
                backgroundRepeat: 'repeat',
              }}
            >
              {messages.map((msg, i) => (
                <Burbuja key={i} msg={msg} avatarSrc={avatarSrc} />
              ))}

              <AnimatePresence mode="wait">
                {loading && <Typing key="typing-indicator" avatarSrc={avatarSrc} />}
              </AnimatePresence>
              <div ref={bottomRef} />


              {/* ── BOTÓN DE SUBIDA DE ARCHIVOS (solo para reservas corporativas) ────────────────────────────── */}
              {mostrarUpload && (
                <div className="mt-4 p-4 bg-limenita-oro/20 border border-limenita-oro rounded-lg text-center">
                  <p className="text-sm text-limenita-madera mb-2"> Por favor, suba el archivo con la lista de invitados para su reserva corporativa:</p>
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <AnimatePresence>
                       {mostrarUpload && (
                         <motion.div
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         className="p-4 border-2 border-dashed border-limenita-oro bg-white/50 rounded-xl space-y-3 shadow-inner"
                         >
                     <p className="text-limenita-madera font-display text-[11px] uppercase tracking-widest text-center font-bold">
                      📁 Adjuntar Lista de Invitados (Excel o PDF)
                     </p>
                          <input 
                            type="file" 
                            accept=".pdf,.xlsx,.xls,.doc,.docx"
                            onChange={handleFileUpload}
                            className="block w-full text-[10px] text-limenita-taupe
                            file:mr-3 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-[10px] file:font-bold file:uppercase
                            file:bg-limenita-zafiro file:text-limenita-crema
                             hover:file:bg-limenita-madera transition-all cursor-pointer"
                     />
          </motion.div>
    )}
  </AnimatePresence>

  <AnimatePresence>
    {loading && <Typing avatarSrc={avatarSrc} />}
  </AnimatePresence>

  <div ref={bottomRef} />
                </div>
              )}

            </div>

            
            {/* ── INPUT ───────────────────────────────── */}
            <div className="flex-shrink-0 border-t border-limenita-taupe/30 bg-white px-3 py-3 flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize hasta 3 líneas
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                }}
                onKeyDown={handleKey}
                placeholder="Escriba su mensaje…"
                disabled={loading}
                className="flex-1 resize-none outline-none text-black font-body text-sm placeholder:text-limenita-taupe/50 bg-transparent leading-relaxed py-1 max-h-20 overflow-y-auto"
              />

              <button
                onClick={() => enviarMensaje()}
                disabled={loading || !input.trim()}
                aria-label="Enviar mensaje"
                className="flex-shrink-0 w-9 h-9 rounded-full bg-limenita-zafiro hover:bg-limenita-madera disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center shadow"
              >
                {/* Icono de envío SVG inline */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-limenita-oro"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Pie discreto */}
            <div className="flex-shrink-0 bg-limenita-taupe text-center py-1.5">
              <span className="font-body text-limenita-taupe/50 text-[10px] tracking-widest uppercase">
                Restaurante Limeñita · Lima, Perú
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}