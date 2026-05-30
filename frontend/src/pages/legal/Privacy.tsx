import { useEffect, useState } from 'react'
import Header from '../../components/LandingComponents/Header'
import Footer from '../../components/LandingComponents/Footer'

export default function Privacy() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDarkMode)
  }, [])

  // Asegurar que al entrar a esta página se posiciona al inicio
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0D0D0D] text-white' : 'bg-white text-gray-800'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto px-4 py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Política de Privacidad</h1>
          <p className="mb-6 text-sm md:text-base">
            En Arias Digital Soft nos tomamos muy en serio la privacidad y protección de datos.
            Esta política describe cómo tratamos la información en el proyecto de Reconocimiento Facial y de Voz.
          </p>
          <section className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Datos Recopilados</h2>
              <p className="mt-2">
                El sistema puede solicitar datos básicos de registro (nombre, correo) y capturas faciales voluntarias para autenticación.
                Las muestras de voz/rostro se usan exclusivamente para entrenamiento y verificación dentro del dispositivo o entorno controlado del proyecto.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Uso de la Información</h2>
              <p className="mt-2">
                Los datos se utilizan para permitir el acceso seguro, mejorar la precisión de los modelos y ofrecer funcionalidades educativas.
                No vendemos ni compartimos datos con terceros ajenos al proyecto.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Almacenamiento y Seguridad</h2>
              <p className="mt-2">
                Implementamos prácticas de seguridad acordes al entorno académico del proyecto. Las capturas y modelos se gestionan de forma controlada
                y, cuando es posible, se almacenan localmente o en servidores bajo supervisión del equipo.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Derechos del Usuario</h2>
              <p className="mt-2">
                Puedes solicitar la eliminación de tus datos, revocar consentimiento o actualizar información de tu cuenta contactando al equipo del proyecto.
                Nos comprometemos a atender estas solicitudes de manera razonable y transparente.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Actualizaciones</h2>
              <p className="mt-2">
                Esta política puede cambiar conforme el proyecto evolucione. Publicaremos las actualizaciones en esta página.
              </p>
            </div>
          </section>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}