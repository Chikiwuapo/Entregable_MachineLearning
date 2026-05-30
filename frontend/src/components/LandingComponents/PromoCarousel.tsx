import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PromoCarouselProps {
  isDarkMode?: boolean;
}

const PromoCarousel: React.FC<PromoCarouselProps> = ({ isDarkMode = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const promociones = [
    {
      id: 1,
      titulo: 'Descubre el poder del Machine Learning en tus decisiones diarias',
      descripcion: 'Convierte datos en soluciones inteligentes sin necesidad de ser experto.',
      imagen: '',
      color: isDarkMode ? '#6A11CB' : '#1B4965',
      showShield: true,
    },
    {
      id: 2,
      titulo: 'Reconocimiento de voz en tiempo real',
      descripcion: 'Procesa y transcribe audio con precisión para automatizar flujos.',
      imagen: 'https://www.profesionalreview.com/wp-content/uploads/2016/08/ReconocimientoVoz.jpg',
      color: isDarkMode ? '#6A11CB' : '#1B4965',
      showShield: false,
    },
    {
      id: 3,
      titulo: 'Visión por computador accesible',
      descripcion: 'Detecta rostros, objetos y patrones sin complejidad.',
      imagen: 'https://img.freepik.com/vector-premium/icono-linea-reconocimiento-facial-escaneo-biometrico-rostros_116137-6905.jpg',
      color: isDarkMode ? '#6A11CB' : '#1B4965',
      showShield: false,
    },
    // Eliminado: cuarta imagen del carrusel (slide 4)
    {
      id: 4,
      titulo: 'Automatiza tu negocio con IA práctica',
      descripcion: 'Integra ML en tu día a día con ejemplos reales.',
      imagen: 'https://eleva502.com/wp-content/uploads/2024/09/DALL%C2%B7E-2024-09-27-10.06.36-A-modern-and-futuristic-blog-cover-for-Aplicaciones-Practicas-de-la-Inteligencia-Artificial-en-los-Negocios.-The-design-should-feature-AI-elements-l.webp',
      color: isDarkMode ? '#6A11CB' : '#1B4965',
      showShield: false,
    },
  ];

  // Ilustraciones SVG adaptativas (sin URLs externas)
  const renderIllustration = (index: number) => {
    const primary = isDarkMode ? '#6A11CB' : '#1B4965';
    const secondary = isDarkMode ? '#3A7BD5' : '#62B6CB';
    const accent = '#F53844';
    const baseBg = isDarkMode ? 'hero-image-dark' : 'hero-image-light';

    switch (index) {
      case 0:
        return (
          <div className={`relative ${baseBg}`}>
            <svg className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[520px] md:h-[420px] lg:w-[640px] lg:h-[500px] mx-auto" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="250" cy="200" r="150" fill={isDarkMode ? 'url(#gradient-dark)' : '#F8FAFC'} opacity="0.8" />
              <circle cx="180" cy="150" r="10" fill={secondary} />
              <circle cx="250" cy="120" r="15" fill={primary} />
              <circle cx="320" cy="150" r="10" fill={accent} />
              <circle cx="200" cy="220" r="12" fill={primary} />
              <circle cx="300" cy="220" r="12" fill={secondary} />
              <circle cx="250" cy="280" r="15" fill={accent} />
              <line x1="180" y1="150" x2="250" y2="120" stroke={secondary} strokeWidth="2" />
              <line x1="250" y1="120" x2="320" y2="150" stroke={primary} strokeWidth="2" />
              <line x1="180" y1="150" x2="200" y2="220" stroke={accent} strokeWidth="2" />
              <line x1="320" y1="150" x2="300" y2="220" stroke={secondary} strokeWidth="2" />
              <line x1="200" y1="220" x2="250" y2="280" stroke={primary} strokeWidth="2" />
              <line x1="300" y1="220" x2="250" y2="280" stroke={accent} strokeWidth="2" />
              <line x1="250" y1="120" x2="250" y2="280" stroke={secondary} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="5 5" />
              <rect x="120" y="100" width="40" height="20" rx="5" fill={secondary} />
              <rect x="340" y="100" width="40" height="20" rx="5" fill={accent} />
              <rect x="120" y="280" width="40" height="20" rx="5" fill={primary} />
              <rect x="340" y="280" width="40" height="20" rx="5" fill={secondary} />
              <defs>
                <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3A7BD5" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#6A11CB" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F53844" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-[#6A11CB]' : 'bg-[#62B6CB]'} opacity-20 blur-3xl -z-10 animate-pulse`} />
          </div>
        );
      case 1:
        // Micrófono para voz
        return (
          <div className={`relative ${baseBg}`}>
            <svg className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[520px] md:h-[420px] lg:w-[640px] lg:h-[500px] mx-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <rect x="220" y="110" width="60" height="140" rx="30" fill={primary} />
              <rect x="210" y="250" width="80" height="18" rx="9" fill={secondary} />
              <path d="M180 170 Q250 130 320 170" stroke={accent} strokeWidth="6" fill="none" />
              <path d="M180 200 Q250 160 320 200" stroke={secondary} strokeWidth="4" fill="none" />
              <path d="M180 230 Q250 190 320 230" stroke={primary} strokeWidth="3" fill="none" />
            </svg>
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-[#6A11CB]' : 'bg-[#62B6CB]'} opacity-20 blur-3xl -z-10 animate-pulse`} />
          </div>
        );
      case 2:
        // Ojo para visión
        return (
          <div className={`relative ${baseBg}`}>
            <svg className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[520px] md:h-[420px] lg:w-[640px] lg:h-[500px] mx-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="250" cy="200" rx="160" ry="90" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} stroke={secondary} strokeWidth="6" />
              <circle cx="250" cy="200" r="45" fill={primary} />
              <circle cx="250" cy="200" r="18" fill={isDarkMode ? '#0D0D0D' : '#FFFFFF'} />
              <path d="M120 200 L80 160" stroke={secondary} strokeWidth="4" />
              <path d="M380 200 L420 240" stroke={primary} strokeWidth="4" />
            </svg>
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-[#6A11CB]' : 'bg-[#62B6CB]'} opacity-20 blur-3xl -z-10 animate-pulse`} />
          </div>
        );
      case 3:
        // Gráfico para modelos
        return (
          <div className={`relative ${baseBg}`}>
            <svg className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[520px] md:h-[420px] lg:w-[640px] lg:h-[500px] mx-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <rect x="80" y="90" width="340" height="220" rx="12" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} stroke={secondary} strokeWidth="3" />
              <polyline points="100,280 160,220 220,240 280,180 340,200 400,140" fill="none" stroke={primary} strokeWidth="6" />
              <polyline points="100,300 160,240 220,260 280,220 340,240 400,180" fill="none" stroke={accent} strokeWidth="3" />
              <circle cx="280" cy="180" r="8" fill={accent} />
              <circle cx="340" cy="200" r="8" fill={secondary} />
            </svg>
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-[#6A11CB]' : 'bg-[#62B6CB]'} opacity-20 blur-3xl -z-10 animate-pulse`} />
          </div>
        );
      case 4:
        // Engranajes para automatización
        return (
          <div className={`relative ${baseBg}`}>
            <svg className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[520px] md:h-[420px] lg:w-[640px] lg:h-[500px] mx-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="220" cy="210" r="60" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} stroke={primary} strokeWidth="6" />
              <circle cx="320" cy="180" r="40" fill={isDarkMode ? '#0F0F10' : '#F0F7FA'} stroke={secondary} strokeWidth="6" />
              <rect x="210" y="200" width="20" height="20" fill={primary} />
              <rect x="310" y="170" width="16" height="16" fill={secondary} />
              <path d="M220 130 L220 90" stroke={primary} strokeWidth="4" />
              <path d="M320 260 L360 260" stroke={secondary} strokeWidth="4" />
            </svg>
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-[#6A11CB]' : 'bg-[#62B6CB]'} opacity-20 blur-3xl -z-10 animate-pulse`} />
          </div>
        );
      default:
        return null;
    }
  };

  // Temporizador con reinicio explícito
  const AUTO_MS = 4000;
  const intervalRef = useRef<number | null>(null);

  const clearAuto = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    clearAuto();
    intervalRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promociones.length);
    }, AUTO_MS);
  }, [clearAuto, promociones.length]);

  const resetAuto = useCallback(() => {
    if (!paused) {
      startAuto();
    } else {
      // Si está pausado, solo limpiar para que al reanudar empiece desde cero
      clearAuto();
    }
  }, [paused, startAuto, clearAuto]);

  // Gestionar temporizador según pausa
  useEffect(() => {
    if (paused) {
      clearAuto();
      return;
    }
    startAuto();
    return () => clearAuto();
  }, [paused, startAuto, clearAuto]);

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + promociones.length) % promociones.length);
    resetAuto();
  };
  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % promociones.length);
    resetAuto();
  };

  // Emitir evento global para que el Header conozca el slide activo
  useEffect(() => {
    try {
      const event = new CustomEvent('carousel_slide_change', { detail: { slide: currentSlide } });
      window.dispatchEvent(event);
    } catch (e) {
      // En algunos navegadores muy antiguos CustomEvent puede no estar disponible
      // pero en entornos modernos esto no debería ocurrir.
    }
  }, [currentSlide]);

  return (
    <section className={`${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white'} relative`}>
      <div className="w-full">
        <div className="relative w-full">
          {/* Carousel Container */}
          <div 
            className="relative overflow-hidden w-full h-screen"
          >
            {/* Slides */}
            <div className="relative h-screen w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full">
                    {/* Background */}
                    {promociones[currentSlide].showShield ? (
                      <div className={`absolute inset-0 ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`} />
                    ) : promociones[currentSlide].imagen ? (
                      <div className="absolute inset-0">
                        <img 
                          src={promociones[currentSlide].imagen}
                          alt={promociones[currentSlide].titulo}
                          className="w-full h-full object-cover object-center"
                          decoding="async"
                          loading="eager"
                        />
                        {/* Overlay: mantener fondo oscuro en slides 2–5 incluso en tema claro */}
                        <div className={`absolute inset-0 ${
                          currentSlide > 0
                            ? 'bg-gradient-to-r from-black/70 via-black/55 to-black/70'
                            : (isDarkMode
                                ? 'bg-gradient-to-r from-black/70 via-black/50 to-black/70'
                                : 'bg-gradient-to-r from-black/30 via-black/20 to-black/30')
                        }`} />
                      </div>
                    ) : null}

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container mx-auto px-4 sm:px-6 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
                          {/* Texto lado izquierdo */}
                          <div className="text-left">
                            <motion.h3 
                              className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-8 ${
                                currentSlide === 0 
                                  ? (isDarkMode ? 'text-white' : 'text-black') 
                                  : 'text-white'
                              }`}
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {promociones[currentSlide].titulo}
                            </motion.h3>
                            
                            <motion.p 
                              className={`text-base sm:text-lg md:text-2xl mb-6 md:mb-10 max-w-2xl ${
                                currentSlide === 0 
                                  ? (isDarkMode ? 'text-gray-200' : 'text-black') 
                                  : 'text-white'
                              }`}
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              {promociones[currentSlide].descripcion}
                            </motion.p>

                            {promociones[currentSlide].showShield && (
                              <motion.div
                                className="flex flex-col sm:flex-row gap-4 sm:gap-5"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                              >
                                <Link to="/auth">
                                <button 
                                  className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base md:text-lg rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
                                    isDarkMode 
                                      ? 'bg-[#6A11CB] hover:bg-[#5A0CB8]' 
                                      : 'bg-[#3A7BD5] hover:bg-[#1B4965]'
                                  }`}
                                >
                                  Pruébalo gratis
                                </button>
                                </Link>
                                <button 
                                  className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base md:text-lg rounded-lg font-semibold border-2 transition-all transform hover:scale-105 ${
                                    isDarkMode 
                                      ? 'border-white text-white hover:bg-white hover:text-black' 
                                      : 'border-[#1B4965] text-[#1B4965] hover:bg-[#1B4965] hover:text-white'
                                  }`}
                                >
                                  Saber más
                                </button>
                              </motion.div>
                            )}
                          </div>

                          {/* Escudo lado derecho */}
                          {promociones[currentSlide].showShield && (
                            <motion.div
                              className="hidden lg:flex justify-center lg:justify-end"
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                            >
                              {renderIllustration(currentSlide)}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botones de navegación izquierda/derecha */}
              <button
                onClick={goPrev}
                aria-label="Imagen anterior"
                className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 md:p-4 backdrop-blur-sm border ${
                  isDarkMode
                    ? 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                    : 'bg-white/70 text-[#1B4965] border-[#1B4965]/20 hover:bg-white'
                }`}
              >
                ‹
              </button>
              <button
                onClick={goNext}
                aria-label="Imagen siguiente"
                className={`absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 md:p-4 backdrop-blur-sm border ${
                  isDarkMode
                    ? 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                    : 'bg-white/70 text-[#1B4965] border-[#1B4965]/20 hover:bg-white'
                }`}
              >
                ›
              </button>

              {/* Indicadores (viñetas) + botón de pausa + CTA beneficios */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                  {promociones.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentSlide(idx); resetAuto(); }}
                      aria-label={`Ir a la imagen ${idx + 1}`}
                      className={`h-3 w-3 md:h-4 md:w-4 rounded-full border transition-all ${
                        idx === currentSlide
                          ? isDarkMode
                            ? 'bg-white border-white'
                            : 'bg-[#1B4965] border-[#1B4965]'
                          : isDarkMode
                            ? 'bg-white/30 border-white/40 hover:bg-white/60'
                            : 'bg-[#1B4965]/30 border-[#1B4965]/40 hover:bg-[#1B4965]/60'
                      }`}
                    />
                  ))}
                  </div>
                  <button
                    onClick={() => { setPaused((p) => !p); resetAuto(); }}
                    aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}
                    className={`rounded-full px-3 py-2 md:px-4 md:py-2 text-sm font-medium backdrop-blur-sm border ${
                      isDarkMode
                        ? 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                        : 'bg-white/70 text-[#1B4965] border-[#1B4965]/20 hover:bg-white'
                    }`}
                  >
                    {paused ? '▶' : '❚❚'}
                  </button>
                </div>

                {/* Texto y botón hacia Beneficios */}
                <div className="flex flex-col items-center gap-2">
                  <p className={`${isDarkMode ? 'text-white' : 'text-[#1B4965]'} text-sm md:text-base`}>Descubre mas</p>
                  <a href="#beneficios">
                    <motion.button
                      aria-label="Ir a Beneficios"
                      className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-semibold border transition-colors ${
                        isDarkMode
                          ? 'bg-[#6A11CB] text-white border-[#6A11CB] hover:brightness-110'
                          : 'bg-[#3A7BD5] text-white border-[#3A7BD5] hover:brightness-110'
                      }`}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↓
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoCarousel;
