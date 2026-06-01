import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { createContext, useContext, useState, useEffect, lazy, Suspense } from 'react'

// — Carga inmediata: solo Landing y Auth (rutas de entrada críticas)
import Landing from './pages/landing/Landing'
import AuthFlowPage from './auth/AuthFlowPage'
import { ModelProvider } from './contexts/ModelContext'

// — Lazy: todo lo demás se descarga solo cuando el usuario navega a esa ruta
const SplashScreen         = lazy(() => import('./components/SplashScreen'))
const Blackboard           = lazy(() => import('./pages/Blackboard/Blackboard'))
const Models               = lazy(() => import('./pages/Blackboard/Models'))
const Dashboard_admin      = lazy(() => import('./pages/Dashboard-admin/UI/Dashboard_admin'))
const Terms                = lazy(() => import('./pages/legal/Terms'))
const Privacy              = lazy(() => import('./pages/legal/Privacy'))

// Arithmetic
const CaptureSamples       = lazy(() => import('./pages/Blackboard/Arithmetic/CaptureSamples'))
const TrainModel           = lazy(() => import('./pages/Blackboard/Arithmetic/TrainModel'))
const PracticeOperations   = lazy(() => import('./pages/Blackboard/Arithmetic/practice/PracticeOperations'))
const PracticeNumeros      = lazy(() => import('./pages/Blackboard/Arithmetic/practice/PracticeNumeros'))

// Vocales
const CaptureSamplesVocales = lazy(() => import('./pages/Blackboard/Vocales/CaptureSamples'))
const TrainModelVocales     = lazy(() => import('./pages/Blackboard/Vocales/TrainModel'))
const PracticeVocales       = lazy(() => import('./pages/Blackboard/Vocales/practice/PracticeVocales'))

// Abecedario
const CaptureSamplesAbecedario = lazy(() => import('./pages/Blackboard/Abecedario/CaptureSamples'))
const TrainModelAbecedario     = lazy(() => import('./pages/Blackboard/Abecedario/TrainModel'))
const PracticeAbecedario       = lazy(() => import('./pages/Blackboard/Abecedario/practice/PracticeAbecedario'))

// Palabras
const CaptureSamplesPalabras = lazy(() => import('./pages/Blackboard/Palabras/CaptureSamples'))
const TrainModelPalabras     = lazy(() => import('./pages/Blackboard/Palabras/TrainModel'))
const PracticePalabras       = lazy(() => import('./pages/Blackboard/Palabras/practice/PracticePalabras'))

// Spinner minimalista para el Suspense fallback
function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid #e5e7eb',
        borderTopColor: '#3b82f6',
        animation: 'spin 0.7s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// Contexto global para tema oscuro profundo
interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false, // Por defecto tema claro
  toggleDarkMode: () => {}
})

export const useTheme = () => useContext(ThemeContext)

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false) // Siempre tema claro por defecto

  useEffect(() => {
    // Aplicar clases globales al body para tema oscuro profundo
    if (isDarkMode) {
      document.body.className = 'bg-[#0A0A0A] text-gray-100 min-h-screen'
      document.documentElement.style.backgroundColor = '#0A0A0A'
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.body.className = 'bg-gray-50 text-gray-900 min-h-screen'
      document.documentElement.style.backgroundColor = '#f9fafb'
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ModelProvider>
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A0A0A] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
          {/**
           * Scroll al ancla cuando regresamos desde páginas legales a una sección específica
           */}
          <ScrollToHash />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/auth" element={<AuthFlowPage />} />
              {/* Páginas legales */}
              <Route path="/terminos" element={<Terms />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/estadistica" element={<Dashboard_admin />} />
              <Route path="/blackboard" element={<Blackboard />} />
              <Route path="/blackboard/models" element={<Models />} />
              <Route path="/arithmetic/capture" element={<CaptureSamples />} />
              <Route path="/arithmetic/train" element={<TrainModel />} />
              <Route path="/arithmetic/practice/operaciones" element={<PracticeOperations />} />
              <Route path="/arithmetic/practice/vocales" element={<PracticeVocales />} />
              <Route path="/arithmetic/practice/abecedario" element={<PracticeAbecedario />} />
              <Route path="/arithmetic/practice/numeros" element={<PracticeNumeros />} />
              <Route path="/arithmetic/practice/palabras" element={<PracticePalabras />} />
              {/* Rutas dedicadas por categoría */}
              <Route path="/vocales/capture" element={<CaptureSamplesVocales />} />
              <Route path="/vocales/train" element={<TrainModelVocales />} />
              <Route path="/vocales/practice" element={<PracticeVocales />} />
              <Route path="/abecedario/capture" element={<CaptureSamplesAbecedario />} />
              <Route path="/abecedario/train" element={<TrainModelAbecedario />} />
              <Route path="/abecedario/practice" element={<PracticeAbecedario />} />
              <Route path="/palabras/capture" element={<CaptureSamplesPalabras />} />
              <Route path="/palabras/train" element={<TrainModelPalabras />} />
              <Route path="/palabras/practice" element={<PracticePalabras />} />
              <Route path="/arithmetic/practice" element={<PracticeOperations />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </ModelProvider>
    </ThemeContext.Provider>
  )
}

// Componente auxiliar: maneja scroll según location.hash
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        // Ajuste específico para "Cómo Funciona" para evitar que quede oculto bajo el header
        if (id === 'como-funciona') {
          const header = document.querySelector('.ads-header') as HTMLElement | null
          const headerHeight = header ? header.getBoundingClientRect().height : 0
          const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16
          window.scrollTo({ top, behavior: 'smooth' })
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }, [location])

  return null
}

export default App
