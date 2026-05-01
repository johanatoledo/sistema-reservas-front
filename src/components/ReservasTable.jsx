import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Clock, Users, DollarSign, FileText, AlertCircle, Eye, X } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';


const ReservasTable = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todas'); // 'todas', 'personal', 'corporativa', 'extranjero'
  const [modalInvitados, setModalInvitados] = useState(null); // Para ver invitados

  // ═══════════════════════════════════════
  // CARGAR RESERVAS
  // ═══════════════════════════════════════

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/admin/reservas`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setReservas(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error("Error cargando reservas:", error);
        setError("No se pudieron cargar las reservas. Intenta nuevamente.");
        setReservas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  // ═══════════════════════════════════════
  // FILTRAR RESERVAS
  // ═══════════════════════════════════════

  const reservasFiltradas = useCallback(() => {
    if (filter === 'todas') return reservas;
    return reservas.filter(r => r.tipo_cliente === filter);
  }, [reservas, filter]);

  // ═══════════════════════════════════════
  // FUNCIONES AUXILIARES
  // ═══════════════════════════════════════

  const formatearFecha = (fecha) => {
    if (!fecha) return '—';
    try {
      return new Date(fecha).toLocaleDateString('es-PE', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return fecha;
    }
  };

  const getEstadoPago = (idTransaccion, estado_pago) => {
    if (estado_pago === 'confirmado' || idTransaccion) {
      return {
        label: 'CON ADELANTO',
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: '💸'
      };
    }
    return {
      label: 'SIN ADELANTO',
      color: 'bg-amber-100 text-red-700 border-amber-300',
      icon: '❌'
    };
  };

  const getTipoCliente = (tipo) => {
    const tipos = {
      personal: { label: 'Personal', bg: 'bg-blue-100 text-blue-700 border-blue-300' },
      corporativa: { label: 'Corporativa', bg: 'bg-purple-100 text-purple-700 border-purple-300' },
      extranjero: { label: 'Extranjero', bg: 'bg-green-100 text-green-700 border-green-300' }
    };
    return tipos[tipo] || { label: tipo, bg: 'bg-gray-100 text-gray-700 border-gray-300' };
  };

  // ═══════════════════════════════════════
  // CARGAR INVITADOS CORPORATIVOS
  // ═══════════════════════════════════════

  const cargarInvitadosCorporativos = async (idReserva) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/reservas/corporativa/${idReserva}`);
      if (!response.ok) throw new Error('Error cargando invitados');
      const datos = await response.json();
      setModalInvitados(datos);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudieron cargar los invitados');
    }
  };

  // ═══════════════════════════════════════
  // COMPONENTE: FILA DE RESERVA
  // ═══════════════════════════════════════

  const FilaReserva = ({ res, isExpanded, onExpand }) => {
    const estadoPago = getEstadoPago(res.id_pago_transaccion, res.estado_pago);
    const tipoCliente = getTipoCliente(res.tipo_cliente);
    const esCorporativa = res.tipo_cliente === 'corporativa';

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="border-b border-limenita-taupe/20 last:border-b-0 hover:bg-limenita-crema/40 transition-colors duration-200"
      >
        {/* FILA PRINCIPAL */}
        <button
          onClick={() => onExpand(isExpanded ? null : res.id)}
          className="w-full text-left px-6 py-4 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-limenita-zafiro/30 rounded"
        >
          {/* Columna 1: Fecha y Hora */}
          <div className="flex-1 min-w-[140px]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-limenita-zafiro flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-limenita-madera">
                  {formatearFecha(res.fecha)}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-limenita-taupe/60" />
                  <p className="text-xs text-limenita-taupe/70">{res.hora || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Cliente */}
          <div className="flex-1 min-w-[200px] px-4">
            <p className="text-sm font-bold text-limenita-madera uppercase tracking-tight">
              {res.nombre_cliente || '—'}
            </p>
            <p className="text-xs text-limenita-taupe/60 mt-1">
              {res.identificador_fiscal || '—'}
            </p>
          </div>

          {/* Columna 3: Personas */}
          <div className="flex-1 min-w-[100px] px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-limenita-oro/15 rounded-full border border-limenita-oro/40">
              <Users className="w-4 h-4 text-limenita-madera" />
              <span className="text-sm font-bold text-limenita-madera">
                {res.numero_personas || '—'}
              </span>
            </div>
          </div>

          {/* Columna 4: Tipo */}
          <div className="flex-1 min-w-[120px] px-4">
            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${tipoCliente.bg}`}>
              {tipoCliente.label}
            </span>
          </div>

          {/* Columna 5: Monto */}
          <div className="flex-1 min-w-[100px] px-4">
            {(Number(res.monto) > 0 || res.id_pago_transaccion || esCorporativa) ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limenita-zafiro/10 rounded border border-limenita-zafiro/30">
                <span className="text-sm font-bold text-limenita-zafiro">
                  S/ {res.monto ? Number(res.monto).toFixed(2) : '0.00'}
                </span>
              </div>
            ) : null}
          </div>

          {/* Columna 6: Pago */}
          <div className="flex-1 min-w-[120px] px-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${estadoPago.color}`}>
              <span className="text-lg leading-none">{estadoPago.icon}</span>
              {estadoPago.label}
            </span>
          </div>

          {/* Botón expandir */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-2 text-limenita-zafiro group-hover:text-limenita-madera transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {/* DETALLE EXPANDIDO */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-limenita-crema/30 border-t border-limenita-taupe/10"
            >
              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* SECCIÓN 1: Información Personal */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-limenita-madera tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-limenita-zafiro"></span>
                    Información Personal
                  </h4>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Cliente
                    </label>
                    <p className="text-sm font-semibold text-limenita-madera mt-1">
                      {res.nombre_cliente || '—'}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Identificador Fiscal
                    </label>
                    <p className="text-sm font-mono bg-limenita-taupe/5 px-3 py-2 rounded border border-limenita-taupe/20 text-limenita-madera mt-1">
                      {res.identificador_fiscal || '—'}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Teléfono
                    </label>
                    <p className="text-sm font-semibold text-limenita-madera mt-1">
                      {res.telefono || '—'}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Correo
                    </label>
                    <p className="text-sm text-limenita-zafiro mt-1 break-all">
                      {res.correo ? (
                        <a href={`mailto:${res.correo}`} className="hover:underline">
                          {res.correo}
                        </a>
                      ) : '—'}
                    </p>
                  </div>
                </div>

                {/* SECCIÓN 2: Detalles de Reserva */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-limenita-madera tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-limenita-zafiro"></span>
                    Detalles de Reserva
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                        Fecha
                      </label>
                      <p className="text-sm font-semibold text-limenita-madera mt-1">
                        {formatearFecha(res.fecha)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                        Hora
                      </label>
                      <p className="text-sm font-semibold text-limenita-madera mt-1">
                        {res.hora || '—'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Número de Personas
                    </label>
                    <p className="text-sm font-semibold text-limenita-madera mt-1">
                      {res.numero_personas || '—'} comensales
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Tipo de Cliente
                    </label>
                    <p className="text-sm font-semibold text-limenita-madera mt-1">
                      {getTipoCliente(res.tipo_cliente).label}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Motivo
                    </label>
                    <p className="text-sm text-limenita-madera mt-1">
                      {res.motivo || '—'}
                    </p>
                  </div>
                </div>

                {/* SECCIÓN 3: Información de Pago */}
                <div className="space-y-4 md:col-span-2">
                  <h4 className="text-xs font-bold uppercase text-limenita-madera tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-limenita-zafiro"></span>
                    Información de Pago
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                        Método de Pago
                      </label>
                      <p className="text-sm font-semibold text-limenita-madera mt-1">
                        {res.metodo_pago || '—'}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                        ID Transacción
                      </label>
                      <div className="mt-1">
                        {res.id_pago_transaccion ? (
                          <p className="text-sm font-mono bg-green-50 px-3 py-2 rounded border border-green-300 text-green-700">
                            {res.id_pago_transaccion}
                          </p>
                        ) : (
                          <p className="text-sm text-amber-600 italic px-3 py-2 bg-amber-50 rounded border border-amber-300">
                           Sin adelanto
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                        Monto (Adelanto / Total)
                      </label>
                      <p className="text-sm font-bold text-limenita-zafiro mt-1">
                        S/ {res.monto ? Number(res.monto).toFixed(2) : (res.monto_total ? Number(res.monto_total).toFixed(2) : '0.00')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-limenita-taupe/70 uppercase tracking-wider">
                      Estado
                    </label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border ${getEstadoPago(res.id_pago_transaccion, res.estado_pago).color}`}>
                        {getEstadoPago(res.id_pago_transaccion, res.estado_pago).label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 4: Invitados Corporativos */}
                {esCorporativa && (
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-xs font-bold uppercase text-limenita-madera tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-limenita-zafiro"></span>
                      Invitados y Menú
                    </h4>

                    <button
                      onClick={() => cargarInvitadosCorporativos(res.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-limenita-zafiro/10 text-limenita-zafiro hover:text-limenita-crema font-bold rounded-lg border border-limenita-zafiro/30 transition-all duration-200 shadow-sm shadow-md active:scale-95"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Invitados y Menú
                    </button>
                  </div>
                )}

                {/* SECCIÓN 5: Nota de creación */}
                <div className="md:col-span-2 text-xs text-limenita-taupe/60 italic border-t border-limenita-taupe/20 pt-4">
                  ID Reserva: <span className="font-mono">{res.id}</span>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // ═══════════════════════════════════════
  // MODAL: INVITADOS CORPORATIVOS
  // ═══════════════════════════════════════

  const ModalInvitados = ({ datos, onClose }) => {
    if (!datos) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className=" bg-white rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col overflow-hidden"
        >
          <div className="bg-orange-300 p-6 text-white flex items-center justify-between shadow-md flex-shrink-0 z-10">
            <h2 className="text-2xl font-bold">
              Invitados - {datos.nombre_cliente}
            </h2>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-limenita-crema font-bold rounded-lg hover:bg-limenita-zafiro/80 transition-colors shadow-md border border-limenita-zafiro/50"
              title="Cerrar Vista"
            >
              <X className="w-5 h-5" />
              
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {datos.invitados && datos.invitados.length > 0 ? (
              datos.invitados.map((invitado, idx) => (
                <div key={idx} className="border border-limenita-taupe/20 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-limenita-madera mb-4">
                    {idx + 1}. {invitado.nombre_invitado}
                  </h3>

                  {/* MENÚ DEL INVITADO */}
                  {invitado.menuItems && invitado.menuItems.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-limenita-zafiro mb-3">
                        Platos y Bebidas:
                      </h4>
                      <div className="space-y-2 bg-limenita-crema/30 p-3 rounded">
                        {invitado.menuItems.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex justify-between items-start text-sm">
                            <div className="flex-1">
                              <p className="font-semibold text-limenita-madera">
                                {item.nombre} <span className="text-limenita-taupe/60">x{item.cantidad}</span>
                              </p>
                              <p className="text-xs text-limenita-taupe/60">
                                {item.categoria}
                              </p>
                            </div>
                            <p className="font-bold text-limenita-zafiro whitespace-nowrap ml-2">
                              S/ {item.subtotal ? Number(item.subtotal).toFixed(2) : (Number(item.precio) * Number(item.cantidad)).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-limenita-taupe/60 text-center py-8">
                No hay invitados registrados
              </p>
            )}

            {/* RESUMEN */}
            {datos.resumenCostos && (
              <div className="bg-gradient-to-r from-limenita-zafiro/10 to-limenita-oro/10 p-6 rounded-lg border border-limenita-oro/30 space-y-3">
                <h3 className="font-bold text-limenita-madera mb-4">Resumen de Costos</h3>

                <div className="border-t border-limenita-taupe/20 pt-3 mt-3">
                  <p className="text-limenita-taupe/70">Monto Total</p>
                  <p className="text-2xl font-bold text-limenita-zafiro">S/ {datos.resumenCostos.monto_total ? Number(datos.resumenCostos.monto_total).toFixed(2) : '0.00'}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // RENDER PRINCIPAL
  // ═══════════════════════════════════════

  return (
    <div className="min-h-screen bg-limenita-crema pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-serif text-limenita-madera tracking-tight">
            Control de Reservas
          </h1>
          <p className="text-limenita-taupe/70 mt-2 text-sm sm:text-base font-light">
            Gestión integral de comensales y eventos corporativos
          </p>
        </motion.div>

        {/* FILTROS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <span className="text-xs font-bold uppercase text-limenita-taupe/70 tracking-wider">
            Filtrar:
          </span>
          {['todas', 'personal', 'corporativa', 'extranjero'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                filter === f
                  ? 'bg-limenita-zafiro text-limenita-crema shadow-md'
                  : 'bg-white text-limenita-madera border border-limenita-taupe/30 hover:border-limenita-zafiro hover:text-limenita-zafiro'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* CONTENEDOR PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-limenita-taupe/20"
        >

          {/* ERROR */}
          {error && (
            <div className="p-4 bg-red-50 border-b border-red-200 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-8 h-8 border-3 border-limenita-zafiro/30 border-t-limenita-zafiro rounded-full mx-auto"
              />
              <p className="text-limenita-taupe mt-4 text-sm font-medium">
                Cargando reservas...
              </p>
            </div>
          )}

          {/* TABLA DE RESERVAS */}
          {!loading && reservasFiltradas().length > 0 ? (
            <div className="divide-y divide-limenita-taupe/20">
              {reservasFiltradas().map((res) => (
                <FilaReserva
                  key={res.id}
                  res={res}
                  isExpanded={expandedId === res.id}
                  onExpand={setExpandedId}
                />
              ))}
            </div>
          ) : !loading ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-limenita-taupe/30 mx-auto mb-4" />
              <p className="text-limenita-taupe text-sm font-medium">
                No hay reservas registradas
              </p>
              <p className="text-limenita-taupe/60 text-xs mt-2">
                Las nuevas reservas aparecerán aquí
              </p>
            </div>
          ) : null}

          {/* FOOTER */}
          {!loading && reservasFiltradas().length > 0 && (
            <div className="bg-limenita-crema/50 px-6 py-4 border-t border-limenita-taupe/20">
              <p className="text-xs sm:text-sm text-limenita-madera font-medium">
                <span className="font-bold">{reservasFiltradas().length}</span> {' '}
                reserva{reservasFiltradas().length !== 1 ? 's' : ''} mostrada{reservasFiltradas().length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

        </motion.div>

      </div>

      {/* MODAL INVITADOS */}
      <AnimatePresence>
        {modalInvitados && (
          <ModalInvitados
            datos={modalInvitados}
            onClose={() => setModalInvitados(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservasTable;