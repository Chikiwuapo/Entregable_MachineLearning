// Auth service to communicate with Django backend
import { http } from '../config/httpClient'

export type PositionData = {
  x?: number
  y?: number
  scale?: number
  roll?: number
  pitch?: number
  yaw?: number
  dist?: number
}

export type AuthResponse = {
  ok: true
  redirect?: string
  user?: {
    id: number
    name: string
    email: string
    nombres: string
    apellidos: string
  }
}

export async function registerBasic(payload: { nombres: string; apellidos: string; email: string; dni: string }) {
  const res = await http('/api/register-basic/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `No se pudo guardar (${res.status})`)
  }
  return data as { ok: true; created?: boolean }
}

export async function validateUserTraditional(params: { email: string; dni: string }) {
  const res = await http('/api/validate-user/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: params.email, dni: params.dni }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.ok) {
    const err: any = new Error(data?.error || 'Credenciales inválidas')
    err.status = res.status
    throw err
  }
  return data as AuthResponse
}

export async function loginFacial(params: { email: string; facialFrame: string; position: PositionData }) {
  const res = await http('/api/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: params.email,
      facial_frame: params.facialFrame,
      position_data: params.position,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `Login failed (${res.status})`)
  }
  return data as AuthResponse
}

export type RegisterPayload = {
  nombres: string
  apellidos: string
  email: string
  dni: string
  facial_frame?: string
  position_data?: PositionData
  samples?: { frames: string[]; positions: PositionData[] }
}

export async function registerUser(payload: RegisterPayload) {
  // GET para recibir el csrftoken cookie
  await http('/register/', { method: 'GET' })
  const csrftoken = getCookie('csrftoken')

  const form = new FormData()
  form.append('nombres', payload.nombres)
  form.append('apellidos', payload.apellidos)
  form.append('email', payload.email)
  form.append('dni', payload.dni)
  if (payload.samples) {
    form.append('samples', JSON.stringify(payload.samples))
  } else if (payload.facial_frame && payload.position_data) {
    form.append('facial_frame', payload.facial_frame)
    form.append('position_data', JSON.stringify(payload.position_data))
  }

  const res = await http('/register/', {
    method: 'POST',
    body: form,
    headers: csrftoken ? { 'X-CSRFToken': csrftoken } : undefined,
  })

  if (res.redirected || res.url.endsWith('/login/')) {
    return { ok: true }
  }
  const text = await res.text().catch(() => '')
  const msg = 'No se pudo registrar tu rostro. Verifica iluminación, encuadre y vuelve a intentar.'
  if (!res.ok) throw new Error(text || `${msg} (HTTP ${res.status})`)
  throw new Error(msg)
}

export async function registerVoice(audioBlob: Blob) {
  const csrftoken = getCookie('csrftoken')

  const pendingTokenRes = await http('/voz/api/get_pending_token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrftoken ? { 'X-CSRFToken': csrftoken } : {}),
    },
  })

  if (!pendingTokenRes.ok) throw new Error('No se pudo obtener el token de registro')

  const tokenData = await pendingTokenRes.json()
  if (!tokenData.success || !tokenData.pending_token) {
    throw new Error('No se pudo generar el token de registro')
  }

  const formData = new FormData()
  formData.append('audio', audioBlob, 'voice_sample.webm')
  formData.append('pending_token', tokenData.pending_token)

  const res = await http('/voz/api/register_audio/', {
    method: 'POST',
    body: formData,
    headers: csrftoken ? { 'X-CSRFToken': csrftoken } : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || `No se pudo guardar el audio (${res.status})`)
  }
  return data as { success: true; message?: string }
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()!.split(';').shift()
  return undefined
}
