import { motion } from 'framer-motion';

interface BenefitsProps {
  isDarkMode?: boolean;
}

const Benefits = ({ isDarkMode = false }: BenefitsProps) => {
  // benefits array kept for reference but rendered via custom bands below
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="beneficios"
      className={`${
        isDarkMode ? 'bg-[#121212]' : 'bg-[#EAF6F9]'
      } relative min-h-screen flex items-center`}
    >
      {/* Fondo sutil con gradiente según tema */}
      <div className={`absolute inset-0 ${
        isDarkMode
          ? 'bg-gradient-to-b from-black/20 via-[#121212] to-black/30'
          : 'bg-gradient-to-b from-white/40 via-[#EAF6F9] to-white/50'
      }`} />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10 w-full">
        {/* Encabezado principal */}
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#1B4965]'
            }`}
          >
            Conoce nuestro beneficios
          </h2>
          {/* Subtítulo y CTAs removidos por solicitud */}
        </div>

        {/* Secciones creativas en bandas en vez de tarjetas */}
        <motion.div
          className="space-y-8 md:space-y-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Banda 1: Voz en tiempo real */}
          <motion.div
            variants={item}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className={`relative group overflow-hidden rounded-2xl p-6 md:p-8 border flex flex-col lg:flex-row items-center gap-6 transition-shadow hover:shadow-xl ${
              isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white shadow-lg border-transparent'
            }`}
          >
            <div className={`absolute -inset-4 rounded-3xl ${isDarkMode ? 'bg-[#6A11CB]/20' : 'bg-[#3A7BD5]/25'} opacity-0 group-hover:opacity-40 group-hover:animate-pulse blur-3xl -z-10 transition-all duration-700`} />
            <div className="flex-1">
              <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1B4965]'}`}>Voz en tiempo real</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-2 md:mt-3 text-base md:text-lg`}>
                Captura, transcribe y activa comandos con baja latencia. Integrado con nuestros modales de consentimiento y UI de voz.
              </p>
              <ul className={`mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Compatibilidad con navegadores modernos</li>
                <li>Eventos y feedback visual en tiempo real</li>
                <li>Controles accesibles y estados claros</li>
                <li>Integración con flujos de curso/blackboard</li>
              </ul>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[320px]">
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <svg className="w-full h-40" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="360" height="120" rx="16" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} />
                  <rect x="180" y="40" width="40" height="70" rx="20" fill={isDarkMode ? '#6A11CB' : '#1B4965'} />
                  <path d="M80 60 Q200 20 320 60" stroke={isDarkMode ? '#3A7BD5' : '#62B6CB'} strokeWidth="4" fill="none" />
                  <path d="M80 90 Q200 50 320 90" stroke="#F53844" strokeWidth="3" fill="none" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Banda 2: Visión por computador */}
          <motion.div
            variants={item}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className={`relative group overflow-hidden rounded-2xl p-6 md:p-8 border flex flex-col lg:flex-row-reverse items-center gap-6 transition-shadow hover:shadow-xl ${
              isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white shadow-lg border-transparent'
            }`}
          >
            <div className={`absolute -inset-4 rounded-3xl ${isDarkMode ? 'bg-[#6A11CB]/20' : 'bg-[#3A7BD5]/25'} opacity-0 group-hover:opacity-40 group-hover:animate-pulse blur-3xl -z-10 transition-all duration-700`} />
            <div className="flex-1">
              <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1B4965]'}`}>Visión por computador</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-2 md:mt-3 text-base md:text-lg`}>
                Detección de rostros y gestos con bibliotecas de visión, integradas en los flujos de registro y login facial.
              </p>
              <ul className={`mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Hooks dedicados para captura facial</li>
                <li>Indicadores y validación progresiva</li>
                <li>Pipeline de entrenamiento y pruebas</li>
                <li>Fallbacks y manejo de errores</li>
              </ul>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[320px]">
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <svg className="w-full h-40" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="200" cy="80" rx="120" ry="60" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} stroke={isDarkMode ? '#3A7BD5' : '#62B6CB'} strokeWidth="4" />
                  <circle cx="200" cy="80" r="24" fill={isDarkMode ? '#6A11CB' : '#1B4965'} />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Banda 3: Seguridad y autenticación */}
          <motion.div
            variants={item}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className={`relative group overflow-hidden rounded-2xl p-6 md:p-8 border flex flex-col lg:flex-row items-center gap-6 transition-shadow hover:shadow-xl ${
              isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white shadow-lg border-transparent'
            }`}
          >
            <div className={`absolute -inset-4 rounded-3xl ${isDarkMode ? 'bg-[#6A11CB]/20' : 'bg-[#3A7BD5]/25'} opacity-0 group-hover:opacity-40 group-hover:animate-pulse blur-3xl -z-10 transition-all duration-700`} />
            <div className="flex-1">
              <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1B4965]'}`}>Seguridad y autenticación</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-2 md:mt-3 text-base md:text-lg`}>
                Flujos de registro e inicio con stepper, validaciones y modales. Manejo de CSRF y envío de formularios seguro.
              </p>
              <ul className={`mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Stepper de registro/login</li>
                <li>Validaciones de email y DNI</li>
                <li>Modales de consentimiento de voz</li>
                <li>Proxy y servicios API listos para backend</li>
              </ul>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[320px]">
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <svg className="w-full h-40" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
                  <rect x="100" y="40" width="200" height="80" rx="12" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} stroke={isDarkMode ? '#6A11CB' : '#1B4965'} />
                  <circle cx="200" cy="80" r="14" fill="#F53844" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;