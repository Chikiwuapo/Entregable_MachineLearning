/**
 * httpClient.ts
 *
 * Cliente HTTP centralizado para todas las llamadas al backend.
 *
 * - En DESARROLLO: usa URLs relativas → el proxy de Vite las redirige a localhost:8000
 * - En PRODUCCIÓN: antepone VITE_API_BASE_URL → las llamadas van a Render directamente
 */

const BASE_URL = import.meta.env.PROD
  ? (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
  : '' // cadena vacía = URL relativa, el proxy de Vite la maneja

/**
 * Construye la URL completa para el entorno actual.
 * @param path - ruta relativa, ej: '/api/login/'
 */
export function buildUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BASE_URL}${cleanPath}`
}

/**
 * fetch envuelto que aplica la URL base de producción automáticamente.
 * Acepta los mismos parámetros que el fetch nativo.
 */
export async function http(path: string, init?: RequestInit): Promise<Response> {
  return fetch(buildUrl(path), {
    credentials: 'include',
    ...init,
  })
}

/** Parsea JSON de forma segura; retorna null si el body está vacío o es inválido */
export async function toJsonSafe<T = any>(res: Response): Promise<T | null> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}
