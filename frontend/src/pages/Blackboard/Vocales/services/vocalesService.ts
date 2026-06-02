// Service layer for Vocales page
import { http, toJsonSafe } from '../../../../config/httpClient'

const apiFetch = (path: string, init?: RequestInit) => {
  const p = path.startsWith('/') ? path.slice(1) : path
  return http(`/vocales/api/${p}`, init)
}

export async function saveGestureAPI(payload: {
  frames: any[]
  vocal: string
  samples: number
  tipo_mano?: 'left' | 'right' | 'both'
  landmarks_izquierda?: any[]
  landmarks_derecha?: any[]
}) {
  const adapted: any = {
    vocal_vinculada: payload.vocal,
    landmarks_data: payload.frames,
    numero_muestras: payload.samples,
  }
  if (payload.tipo_mano) adapted.tipo_mano = payload.tipo_mano
  if (payload.landmarks_izquierda) adapted.landmarks_izquierda = payload.landmarks_izquierda
  if (payload.landmarks_derecha) adapted.landmarks_derecha = payload.landmarks_derecha

  const res = await apiFetch('guardar-gesto/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adapted),
  })
  return toJsonSafe(res)
}

export async function recognizeGestureAPI(payload: { frame: any }) {
  const res = await apiFetch('reconocer-gesto/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ landmarks_data: payload.frame }),
  })
  return toJsonSafe(res)
}

export async function getTrainedGesturesAPI() {
  const res = await http('/vocales/gestos_entrenados/')
  return toJsonSafe(res)
}

export async function recognizeTwoHandsAPI(payload: { left?: any; right?: any }) {
  const res = await apiFetch('reconocer-dos-manos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ landmarks_data: payload }),
  })
  return toJsonSafe(res)
}

export async function deleteGestureAPI(gestoId: number) {
  try {
    const res = await http(`/vocales/eliminar-gesto/${gestoId}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) return toJsonSafe(res)
  } catch {}
  return { success: false, error: 'No se pudo eliminar el gesto' }
}

export async function getVocalesCapturedAPI() {
  const res = await apiFetch('vocales-capturadas/')
  return toJsonSafe(res)
}

export async function getVocalesStatsAPI() {
  const res = await apiFetch('estadisticas-practica/')
  return toJsonSafe(res)
}
