// Service layer for Arithmetic page
import { http, toJsonSafe } from '../../../../config/httpClient'

export const apiFetch = (path: string, init?: RequestInit) => {
  const p = path.startsWith('/') ? path.slice(1) : path
  return http(`/api/operaciones/${p}`, init)
}

export async function saveGestureAPI(payload: any) {
  const res = await apiFetch('guardar-gesto/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return toJsonSafe(res)
}

export async function recognizeGestureAPI(landmarks: any) {
  const res = await apiFetch('reconocer-gesto/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ landmarks_data: landmarks }),
  })
  return toJsonSafe(res)
}

export async function getTrainedGesturesAPI() {
  const res = await apiFetch('gestos-entrenados/')
  return toJsonSafe(res)
}

export async function calculateAPI(payload: any) {
  const res = await apiFetch('calcular-operacion/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return toJsonSafe(res)
}

export async function recognizeTwoHandsAPI(payload: { left?: any; right?: any }) {
  const res = await apiFetch('reconocer-dos-manos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return toJsonSafe(res)
}

export async function deleteGestureAPI(gestoId: number) {
  const candidates = [
    `/api/operaciones/eliminar-gesto/${gestoId}/`,
    `/operaciones/eliminar-gesto/${gestoId}/`,
  ]
  for (const url of candidates) {
    try {
      const res = await http(url, { method: 'DELETE' })
      if (res.ok) return toJsonSafe(res)
    } catch {
      // try next
    }
  }
  return { success: false, error: 'No se pudo eliminar el gesto' }
}
