
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BIENVENIDA = {
  role: "assistant",
  content:
    "Bienvenido a El Sabor de la Casona. Es un placer atenderle. ¿Desea realizar una reserva personal o corporativa?",
};

const BASEURL = import.meta.env.VITE_BACKEND_URL || "";

const crearSesion = () => crypto.randomUUID();

const renderContentWithLinks = (text = "") => {
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const [fullMatch, label, url] = match;

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`${url}-${match.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-limenita-zafiro font-bold underline hover:text-limenita-madera transition"
      >
        {label}
      </a>
    );

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const Burbuja = ({ msg, avatarSrc }) => {
  const esBot = msg.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${esBot ? "justify-start" : "justify-end"}`}
    >
      {esBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-limenita-oro shadow-md">
          <img
            src={avatarSrc}
            alt="El Sabor de la Casona"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 text-sm font-body leading-relaxed shadow-sm ${
          esBot
            ? "bg-white text-limenita-madera rounded-t-2xl rounded-br-2xl rounded-bl-sm border-l-4 border-limenita-zafiro"
            : "bg-limenita-zafiro text-limenita-crema rounded-t-2xl rounded-bl-2xl rounded-br-sm"
        }`}
      >
        {esBot ? renderContentWithLinks(msg.content) : msg.content}
      </div>
    </motion.div>
  );
};

const Typing = ({ avatarSrc }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex items-end gap-2 justify-start"
  >
    <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md">
      <img
        src={avatarSrc}
        alt="El Sabor de la Casona escribiendo"
        className="w-full h-full object-cover object-top"
      />
    </div>

    <div className="bg-white border-l-4 border-limenita-oro px-4 py-3 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
      <div className="flex items-center gap-2 min-w-[44px] min-h-[16px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1 h-1 rounded-full bg-gray-700"
            animate={{
              y: [0, -5, 0],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default function LimenitaAgent({ isOpen, onClose, avatarSrc }) {
  const [messages, setMessages] = useState([BIENVENIDA]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(crearSesion);
  const [reservaEstado, setReservaEstado] = useState("recopilando");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const loadingRef = useRef(false);
  const messagesRef = useRef([BIENVENIDA]);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 350);

      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const llamarApi = useCallback(async (historial, signal) => {
    const response = await fetch(`${BASEURL}/api/chat`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "true",
      },
      body: JSON.stringify({
        sessionId,
        messages: historial
          .filter((msg) => msg !== BIENVENIDA)
          .map(({ role, content }) => ({ role, content })),
      }),
      signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.error || `Error de comunicación HTTP ${response.status}`
      );
    }

    if (typeof data?.result?.content !== "string") {
      throw new Error("Respuesta inválida del asistente.");
    }

    return {
      content: data.result.content,
      estado: data.estado || "recopilando",
    };
  }, [sessionId]);

  const enviarMensaje = async (textoInput) => {
    const texto = (textoInput ?? input).trim();

    if (!texto || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setInput("");

    const nuevoHistorial = [
      ...messagesRef.current,
      { role: "user", content: texto },
    ];

    messagesRef.current = nuevoHistorial;
    setMessages(nuevoHistorial);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const respuesta = await llamarApi(
        nuevoHistorial,
        controller.signal
      );

      const mensajeAgente = {
        role: "assistant",
        content: respuesta.content,
      };

      messagesRef.current = [
        ...messagesRef.current,
        mensajeAgente,
      ];

      setMessages(messagesRef.current);
      setReservaEstado(respuesta.estado);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error del agente:", error);

        const mensajeError = {
          role: "assistant",
          content:
            "Disculpe, hubo un inconveniente técnico. Por favor, inténtelo nuevamente en un momento.",
        };

        messagesRef.current = [
          ...messagesRef.current,
          mensajeError,
        ];

        setMessages(messagesRef.current);
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
      abortRef.current = null;
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

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
            style={{ background: "#F3E5DC" }}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            {/* HEADER */}
            <header className="relative flex items-center gap-3 px-4 py-3 bg-limenita-taupe flex-shrink-0">
              <div
                className="absolute inset-0 opacity-10 bg-repeat"
                style={{ background: "#F3E5DC" }}
              />

              <div className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-2 border-limenita-oro shadow-lg flex-shrink-0">
                <img
                  src={avatarSrc}
                  alt="Agente El Sabor de la Casona"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="relative z-10 flex flex-col">
                <span className="font-display text-limenita-crema text-xl leading-tight">
                  El Sabor de la Casona
                </span>
                <span className="font-body text-limenita-crema/70 text-xs tracking-wide">
                  Asistente de reservas
                </span>
              </div>

              <div className="relative z-10 ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-limenita-crema/70 text-xs">
                  En línea
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Cerrar chat"
                className="relative z-10 ml-3 w-7 h-7 flex items-center justify-center rounded-full bg-limenita-madera/30 hover:bg-limenita-madera/60 transition text-limenita-crema text-lg leading-none"
              >
                ×
              </button>
            </header>

            {/* MENSAJES */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F3E5DC]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(243,229,220,0.95), rgba(243,229,220,0.95)), url(/src/assets-optimized/texture/damasco-limeñita.webp)",
                backgroundRepeat: "repeat",
              }}
            >
              {messages.map((msg, i) => (
                <Burbuja key={i} msg={msg} avatarSrc={avatarSrc} />
              ))}

              {loading && <Typing avatarSrc={avatarSrc} />}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="flex-shrink-0 border-t border-limenita-taupe/30 bg-white px-3 py-3 flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 80) + "px";
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
                Restaurante El Sabor de la Casona · Lima, Perú
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
