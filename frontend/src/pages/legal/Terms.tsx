import { useEffect, useState } from 'react'
import Header from '../../components/LandingComponents/Header'
import Footer from '../../components/LandingComponents/Footer'

export default function Terms() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Términos y Condiciones</h1>
          <p className="mb-6 text-sm md:text-base">
            Bienvenido a nuestro proyecto de Reconocimiento Facial y de Voz (Arias Digital Soft).
            Al utilizar esta plataforma, aceptas los siguientes términos, diseñados para proteger a los usuarios y garantizar un uso responsable de la tecnología.
          </p>
          <section className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Uso del Servicio</h2>
              <p className="mt-2">
                La plataforma ha sido creada con fines educativos y demostrativos. No debe utilizarse para fines ilegales, de vigilancia sin consentimiento
                o actividades que vulneren la privacidad de las personas. Los ejemplos de entrenamiento y práctica (vocales, palabras, abecedario y operaciones)
                están destinados a aprendizaje y experimentación.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Registro y Autenticación</h2>
              <p className="mt-2">
                El flujo de autenticación puede incluir reconocimiento facial y/o credenciales tradicionales. El usuario es responsable de mantener la seguridad de su cuenta
                y de proporcionar datos veraces durante el registro. El reconocimiento facial se realiza con muestras locales del usuario y no se comparte con terceros.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Propiedad Intelectual</h2>
              <p className="mt-2">
                El contenido técnico, interfaces y materiales de este proyecto pertenecen a sus autores. No se permite la reproducción o distribución con fines comerciales
                sin autorización. Las imágenes y recursos utilizados en el carrusel y secciones informativas pueden incluir material de terceros con sus correspondientes créditos.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Limitación de Responsabilidad</h2>
              <p className="mt-2">
                El sistema se entrega “tal cual”. Aunque se realizan esfuerzos por la precisión del reconocimiento de voz y rostro, no se garantiza un desempeño perfecto en todos los entornos.
                Los autores no se responsabilizan por daños derivados del uso inadecuado de la plataforma.
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Cambios en los Términos</h2>
              <p className="mt-2">
                Estos términos pueden actualizarse para reflejar mejoras del proyecto o cambios legales. Te recomendamos revisar esta página periódicamente.
              </p>
            </div>
          </section>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}