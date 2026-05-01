import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar el token
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Users, CheckCircle, CreditCard, X } from 'lucide-react';
import { menuData } from '../data/menuData';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const FormularioInvitadosCorporativo = () => {
  // ═══════════════════════════════════════
  // 1. CAPTURA DEL ID DE RESERVA
  // ═══════════════════════════════════════
  // Extraemos id o tokenReserva 
 const { reservaId } = useParams();
const idReservaUrl = reservaId;

  const [reservaData, setReservaData] = useState(null);
  const [errorToken, setErrorToken] = useState(false);

  useEffect(() => {
    const fetchReserva = async () => {
      if (idReservaUrl) {
        if (!isNaN(idReservaUrl)) {
          try {
            const response = await fetch(`${BASE_URL}/api/admin/reservas/corporativa/${idReservaUrl}`);
            if (response.ok) {
              const data = await response.json();
              setReservaData({ 
                id_reserva_base: Number(idReservaUrl),
                nombre: data.nombre_cliente,
                ruc: data.ruc,
                fecha: data.fecha ? data.fecha.split('T')[0] : '',
                hora: data.hora
              });
            } else {
              setReservaData({ id_reserva_base: Number(idReservaUrl) });
            }
          } catch (err) {
            console.error("Error al obtener datos de reserva:", err);
            setReservaData({ id_reserva_base: Number(idReservaUrl) });
          }
        } else {
          setErrorToken(true);
        }
      }
    };
    fetchReserva();
  }, [idReservaUrl]);

  // ═══════════════════════════════════════
  // 2. ESTADO DEL FORMULARIO
  // ═══════════════════════════════════════
  const [invitados, setInvitados] = useState([]);
  const [nuevoInvitado, setNuevoInvitado] = useState({ nombre: '', email: '', telefono: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [expandedInvitado, setExpandedInvitado] = useState(null);
  const [procesoActivo, setProcesoActivo] = useState('invitados');
  const [metodoPago, setMetodoPago] = useState('Yape');
  const [idTransaccion, setIdTransaccion] = useState('');

  // ═══════════════════════════════════════
  // 3. LÓGICA DE INVITADOS Y MENÚ
  // ═══════════════════════════════════════
  
  const agregarInvitado = () => {
    if (nuevoInvitado.nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return;
    }

    const invitadoNuevo = {
      id: Date.now(),
      nombre: nuevoInvitado.nombre.trim(),
      menuSeleccionado: []
    };

    setInvitados([...invitados, invitadoNuevo]);
    setNuevoInvitado({ nombre: '', menuSeleccionado: [] });
    setError(null);
    setExpandedInvitado(invitadoNuevo.id);
  };

  const eliminarInvitado = (id) => {
    setInvitados(invitados.filter(inv => inv.id !== id));
  };

  const agregarPlatoAInvitado = (invitadoId, categoria, plato) => {
    setInvitados(invitados.map(inv => {
      if (inv.id === invitadoId) {
        return {
          ...inv,
          menuSeleccionado: [...inv.menuSeleccionado, {
            id: Date.now() + Math.random(),
            categoria,
            nombre: plato.name,
            precio: plato.price,
            cantidad: 1
          }]
        };
      }
      return inv;
    }));
  };

  const calcularCostoTotal = () => {
    return invitados.reduce((total, inv) => {
      return total + inv.menuSeleccionado.reduce((t, p) => t + (p.precio * p.cantidad), 0);
    }, 0);
  };

  // ═══════════════════════════════════════
  // 4. GUARDAR EN EL BACKEND
  // ═══════════════════════════════════════
  const guardarInvitadosCorporativos = async () => {
    if (invitados.length === 0) return setError('Agrega invitados');
    
    setLoading(true);
    try {
      const datosCompletos = {
        id_reserva_base: reservaData.id_reserva_base,
        monto: calcularCostoTotal(),
        invitados: invitados
      };
      const idReserva= datosCompletos.id_reserva_base;
      const response = await fetch(`${BASE_URL}/api/admin/reservas/corporativa/${idReserva}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCompletos)
      });

      if (response.ok) {
        setSuccess(true);
        setProcesoActivo('pago');
      } else {
        throw new Error('Error al guardar');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ═══════════════════════════════════════
  // 5. ENVIAR PAGO CORPORATIVO
  // ═══════════════════════════════════════
  const confirmarPago = async () => {
    if (!idTransaccion.trim()) return setError('Por favor, ingresa el ID de la transacción');
    
    setLoading(true);
    setError(null);
    
    try {
      const idReserva = reservaData.id_reserva_base;
      const response = await fetch(`${BASE_URL}/api/admin/reservas/corporativa/${idReserva}/pago`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_pago_transaccion: idTransaccion,
          metodo_pago: metodoPago
        })
      });

      if (!response.ok) throw new Error('Error al registrar el pago');
      
      setProcesoActivo('completado');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ═══════════════════════════════════════
  // VISTAS CONDICIONALES
  // ═══════════════════════════════════════

  if (errorToken) return <div className="p-20 text-center text-red-600">Enlace inválido o expirado.</div>;
  if (!reservaData) return <div className="p-20 text-center">Decodificando reserva...</div>;

  
   return (
    <div className="min-h-screen bg-[#fdfaf5] pb-12">
      
      {/* ENCABEZADO EXCLUSIVO (Sin opciones de Navbar) */}
      <div className="bg-limenita-taupe/10 w-full py-6 flex flex-col items-center justify-center shadow-md mb-8">
        <h1 className="text-4xl font-serif text-limenita-oro tracking-[0.15em] uppercase">Limeñita</h1>
        <p className="text-limenita-oro text-xs font-bold tracking-[0.3em] mt-2 uppercase text-center px-4">Registro de Invitados Corporativos</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        
        {/* INFO DE LA EMPRESA DECODIFICADA */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-[#d4c5b9]">
          <h1 className="text-3xl font-serif text-[#4a3728]">
            {reservaData.nombre || 'Registro de Invitados'}
          </h1>
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <span className="bg-[#1e3a5f] text-white px-3 py-1 rounded-full font-bold shadow-sm">
              {reservaData.ruc ? `RUC: ${reservaData.ruc}` : `Reserva Corporativa #${reservaData.id_reserva_base}`}
            </span>
            {reservaData.fecha && (
              <span className="text-[#8c786a] font-semibold flex items-center gap-1">📅 {reservaData.fecha}</span>
            )}
            {reservaData.hora && (
              <span className="text-[#8c786a] font-semibold flex items-center gap-1">⏰ {reservaData.hora}</span>
            )}
          </div>
        </div>

        {/* NAVEGACIÓN DE PASOS - COLORES DE ALTO CONTRASTE */}
        <div className="flex mb-8 border-b-2 border-[#d4c5b9]">
          {['invitados', 'menu', 'pago'].map(step => (
            <button 
              key={step}
              className={`px-8 py-3 uppercase text-xs font-black tracking-widest transition-all ${step === 'pago' && procesoActivo === 'completado' ? 'hidden' : ''} ${
                procesoActivo === step 
                ? 'border-b-4 border-[#1e3a5f] text-[#1e3a5f] bg-[#1e3a5f]/5' 
                : 'text-[#8c786a] hover:text-[#4a3728]'
              }`}
              onClick={() => setProcesoActivo(step === 'pago' && success ? 'pago' : step)}
              disabled={step === 'pago' && !success}
            >
              {step}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <AnimatePresence mode="wait">
          {procesoActivo === 'invitados' && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* CAJA PARA AGREGAR INVITADO */}
              <div className="bg-white p-6 rounded-xl border-2 border-[#d4c5b9] shadow-lg">
                <h3 className="font-bold text-[#4a3728] mb-4 uppercase text-sm tracking-wider">Agregar nuevo invitado:</h3>
                <div className="flex flex-col md:flex-row gap-3">
                  <input 
                    className="flex-1 p-4 border-2 border-[#d4c5b9] rounded-xl text-[#4a3728] font-medium focus:border-[#1e3a5f] outline-none transition-all placeholder:text-gray-400" 
                    placeholder="Ej. Maria Perez" 
                    value={nuevoInvitado.nombre}
                    onChange={e => setNuevoInvitado({...nuevoInvitado, nombre: e.target.value})}
                  />
                  <button 
                    onClick={agregarInvitado} 
                    className="bg-[#1e3a5f] text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#162d4a] transition-all shadow-xl active:scale-95"
                  >
                    AGREGAR
                  </button>
                </div>
              </div>
              
              {/* LISTA DE INVITADOS AGREGADOS */}
              <div className="grid gap-3">
                {invitados.map((inv, index) => (
                  <motion.div 
                    key={inv.id} 
                    layout
                    className="bg-white p-4 rounded-xl border border-[#d4c5b9] flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 rounded-full bg-[#c4a484] text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-bold text-[#4a3728]">{inv.nombre}</span>
                    </div>
                    <button 
                      onClick={() => eliminarInvitado(inv.id)} 
                      className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
                    >
                      <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform"/>
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {/* BOTÓN PARA PASAR AL SIGUIENTE NIVEL */}
              {invitados.length > 0 && (
                <button 
                  onClick={() => setProcesoActivo('menu')}
                  className="py-6 bg-[#c4a484] text-white font-black uppercase tracking-wide rounded-xl shadow-2xl hover:bg-[#b39373] transition-all mt-8 border-b-4 border-[#a38363]"
                >
                   Seleccionar Menú →
                </button>
              )}
            </motion.div>
          )}

          {procesoActivo === 'menu' && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {invitados.length === 0 ? (
                <div className="bg-white p-16 rounded-3xl border-4 border-dotted border-[#d4c5b9] text-center">
                   <Users className="w-16 h-16 text-[#d4c5b9] mx-auto mb-4"/>
                   <p className="text-[#4a3728] font-black text-xl mb-6">¡Vaya! No has agregado invitados aún.</p>
                   <button 
                     onClick={() => setProcesoActivo('invitados')} 
                     className="bg-[#1e3a5f] text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                   >
                     Regresar a la pestaña anterior
                   </button>
                </div>
              ) : (
                <>
                  {invitados.map(inv => (
                    <div key={inv.id} className="bg-white p-6 rounded-2xl border-2 border-[#d4c5b9] shadow-md">
                      <h4 className="font-black text-[#1e3a5f] text-lg border-b-2 border-[#f5f0eb] pb-3 mb-5 uppercase tracking-wide">
                        Menú para: {inv.nombre}
                      </h4>
                      
                      {/* PLATOS SELECCIONADOS */}
                      <div className="space-y-2 mb-6">
                        {inv.menuSeleccionado.map(p => (
                          <div key={p.id} className="flex justify-between items-center bg-[#fdfaf5] border border-[#d4c5b9]/30 p-3 rounded-xl">
                            <span className="font-bold text-[#4a3728]"> {p.nombre}</span>
                            <span className="text-[#1e3a5f] font-black">S/ {p.price || p.precio}</span>
                          </div>
                        ))}
                      </div>

                      {/* SELECTOR DESPLEGABLE */}
                      <select 
                        className="w-full p-6 border-2 border-[#d4c5b9] rounded-xl bg-white text-[#4a3728] font-bold focus:ring-4 focus:ring-[#1e3a5f]/10 outline-none cursor-pointer"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) return;
                          const [cat, name] = val.split('|');
                          const plato = menuData[cat].find(p => p.name === name);
                          agregarPlatoAInvitado(inv.id, cat, plato);
                          e.target.value = "";
                        }}
                      >
                        <option value="">+ Haz clic aquí para añadir plato o bebida...</option>
                        {Object.keys(menuData).map(cat => (
                          <optgroup key={cat} label={cat.toUpperCase()} className="bg-gray-100 text-[#1e3a5f]">
                            {menuData[cat].map(p => (
                              <option key={p.name} value={`${cat}|${p.name}`}>
                                {p.name} — S/ {p.price}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  ))}
                  
                  {/* BARRA TOTAL FINAL */}
                  <div className="p-8 bg-[#1e3a5f] text-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 mt-12 border-b-8 border-[#162d4a]">
                    <div className="text-center md:text-left">
                      <p className="text-xs opacity-70 font-black uppercase tracking-widest mb-1">Total acumulado</p>
                      <span className="text-5xl font-serif">S/ {calcularCostoTotal().toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={guardarInvitadosCorporativos} 
                      className="bg-[#c4a484] hover:bg-white hover:text-[#1e3a5f] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                    >
                      {loading ? "PROCESANDO..." : "CONFIRMAR RESERVA"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {procesoActivo === 'pago' && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white p-10 rounded-2xl border-2 border-[#d4c5b9] shadow-lg text-center">
                <h2 className="text-3xl font-black text-[#1e3a5f] mb-2 uppercase tracking-wide">Pago de la Reserva</h2>
                <p className="text-[#8c786a] mb-8 font-medium">
                  El monto total a pagar por los invitados es: <br/>
                  <span className="font-serif text-4xl text-[#4a3728] mt-2 block">S/ {calcularCostoTotal().toFixed(2)}</span>
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${metodoPago === 'Yape' ? 'border-[#1e3a5f] bg-[#1e3a5f]/5' : 'border-[#d4c5b9] hover:border-[#1e3a5f]/50'}`}>
                    <input type="radio" name="metodo" value="Yape" checked={metodoPago === 'Yape'} onChange={() => setMetodoPago('Yape')} className="w-5 h-5 accent-[#1e3a5f]" />
                    <span className="font-bold text-[#4a3728] text-lg">Yape</span>
                  </label>
                  
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${metodoPago === 'Tarjeta' ? 'border-[#1e3a5f] bg-[#1e3a5f]/5' : 'border-[#d4c5b9] hover:border-[#1e3a5f]/50'}`}>
                    <input type="radio" name="metodo" value="Tarjeta" checked={metodoPago === 'Tarjeta'} onChange={() => setMetodoPago('Tarjeta')} className="w-5 h-5 accent-[#1e3a5f]" />
                    <CreditCard className="w-6 h-6 text-[#1e3a5f]"/>
                    <span className="font-bold text-[#4a3728] text-lg">Tarjeta / Culqi</span>
                  </label>
                </div>

                <div className="max-w-md mx-auto">
                  <input 
                    className="w-full p-4 border-2 border-[#d4c5b9] rounded-xl text-[#4a3728] font-medium focus:border-[#1e3a5f] outline-none transition-all placeholder:text-gray-400 mb-4 text-center" 
                    placeholder="Ingresa el ID de la transacción" 
                    value={idTransaccion}
                    onChange={e => setIdTransaccion(e.target.value)}
                  />
                  
                  {error && (
                    <div className="text-red-600 mb-4 font-bold text-sm bg-red-50 p-3 rounded-lg">{error}</div>
                  )}

                  <button 
                    onClick={confirmarPago} 
                    className="w-full bg-[#1e3a5f] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#162d4a] transition-all shadow-xl active:scale-95"
                    disabled={loading}
                  >
                    {loading ? "PROCESANDO..." : "CONFIRMAR PAGO"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {procesoActivo === 'completado' && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-16 rounded-3xl border-4 border-green-500 text-center shadow-2xl relative">
              <button 
                onClick={() => window.close()} 
                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                title="Cerrar pestaña"
              >
                <X className="w-8 h-8" />
              </button>
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tight">¡Reserva Completada!</h2>
              <p className="text-[#8c786a] text-lg font-medium max-w-lg mx-auto mb-8">
                Los datos de tus invitados y el pago han sido registrados exitosamente. Te hemos enviado un correo de confirmación. ¡Los esperamos!
              </p>
              <button 
                onClick={() => window.close()} 
                className="bg-green-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95"
              >
                CERRAR VENTANA
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


export default FormularioInvitadosCorporativo;