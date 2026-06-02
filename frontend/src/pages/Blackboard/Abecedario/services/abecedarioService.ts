// Servicio para la página de Abecedario
import { http, toJsonSafe } from '../../../../config/httpClient'

const API_BASE = '/abecedario/api'

export async function saveGestureAPI(payload: {
  frames: any[]
  letra: string
  samples: number
  tipo_mano?: 'left' | 'right' | 'both'
  landmarks_izquierda?: any[]
  landmarks_derecha?: any[]
}) {
  const adapted: any = {
    letra_vinculada: payload.letra,
    landmarks_data: payload.frames,
    numero_muestras: payload.samples,
  }
  if (payload.tipo_mano) adapted.tipo_mano = payload.tipo_mano
  if (payload.landmarks_izquierda) adapted.landmarks_izquierda = payload.landmarks_izquierda
  if (payload.landmarks_derecha) adapted.landmarks_derecha = payload.landmarks_derecha

  const response = await http(`${API_BASE}/guardar-gesto/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adapted),
  })
  return toJsonSafe(response)
}

export async function recognizeGestureAPI(payload: { frame: any }) {
  const response = await http(`${API_BASE}/reconocer-gesto/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ landmarks_data: payload.frame }),
  })
  return toJsonSafe(response)
}

export async function getTrainedGesturesAPI() {
  const response = await http('/abecedario/gestos_entrenados/')
  return toJsonSafe(response) || []
}

export async function recognizeTwoHandsAPI(payload: { leftFrame: any; rightFrame: any }) {
  const response = await http(`${API_BASE}/reconocer-dos-manos/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ landmarks_data: { left: payload.leftFrame, right: payload.rightFrame } }),
  })
  return toJsonSafe(response)
}

export async function deleteGestureAPI(gestureId: number) {
  const candidates = [
    `/abecedario/eliminar-gesto/${gestureId}/`,
    `/api/abecedario/eliminar-gesto/${gestureId}/`,
  ]
  for (const url of candidates) {
    try {
      const res = await http(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      if (res.ok) return toJsonSafe(res)
    } catch {}
  }
  return { success: false, error: 'No se pudo eliminar el gesto' }
}

export async function getCapturedLettersAPI() {
  const response = await http(`${API_BASE}/letras-capturadas/`)
  return toJsonSafe(response) || []
}

export async function getLetterStatsAPI() {
  const response = await http(`${API_BASE}/estadisticas-practica/`)
  return toJsonSafe(response) || {
    total_attempts: 0,
    correct_attempts: 0,
    current_streak: 0,
    best_streak: 0,
    accuracy: 0,
  }
}
