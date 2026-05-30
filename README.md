# AresDigitalAcademy — Plataforma Educativa Multimodal

Plataforma educativa para aprendizaje interactivo mediante reconocimiento de gestos, voz y rostro. Combina un backend Django con IA (scikit-learn) y un frontend React moderno con MediaPipe para visión en tiempo real.

---

## Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Ejecución en Local](#ejecución-en-local)
  - [Backend (Django)](#backend-django)
  - [Frontend (React + Vite)](#frontend-react--vite)
- [Variables de Entorno](#variables-de-entorno)
- [Endpoints API](#endpoints-api)
- [Rutas del Frontend](#rutas-del-frontend)
- [Funcionalidades](#funcionalidades)
- [Notas sobre dependencias opcionales](#notas-sobre-dependencias-opcionales)

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND  http://localhost:5173                 │
│  React 19 + TypeScript + Tailwind CSS + Framer Motion       │
│  MediaPipe (Web) — reconocimiento de gestos y rostro        │
│  Zustand — estado global de usuario                         │
└────────────────────┬────────────────────────────────────────┘
                     │  HTTP / REST  (proxy Vite en dev)
┌────────────────────▼────────────────────────────────────────┐
│              BACKEND   http://127.0.0.1:8000                 │
│  Django 5.2.6 + Django REST Framework                       │
│  scikit-learn — chatbot educativo con IA                    │
│  SQLite (dev) / PostgreSQL o MySQL (prod)                   │
│  Apps: login, operaciones, vocales, abecedario,             │
│         palabras, voz, chatbot_educativo                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológico

### Backend
| Paquete | Versión | Uso |
|---------|---------|-----|
| Django | 5.2.6 | Framework principal |
| djangorestframework | 3.14.0 | API REST |
| django-cors-headers | 4.3.1 | CORS para el frontend |
| scikit-learn | 1.7.2 | Modelo de chatbot (TF-IDF + clasificadores) |
| numpy | 2.2.6 | Cómputo numérico |
| opencv-python | 4.12.0.88 | Procesamiento de imágenes |
| pandas | 2.3.3 | Manejo de datos de entrenamiento |
| whitenoise | 6.6.0 | Archivos estáticos en producción |
| python-dotenv | 1.1.1 | Variables de entorno |
| dj-database-url | 2.1.0 | Configuración de BD por URL |

### Frontend
| Paquete | Versión | Uso |
|---------|---------|-----|
| React | 19.1.1 | UI |
| TypeScript | 5.8.3 | Tipado estático |
| Vite | 7.1.2 | Build tool y dev server |
| React Router | 7.9.1 | Enrutamiento SPA |
| Tailwind CSS | 4.1.13 | Estilos utility-first |
| Framer Motion | 12.23.15 | Animaciones |
| GSAP | 3.13.0 | Animaciones avanzadas |
| Spline React | 4.1.0 | Modelos 3D interactivos |
| Recharts | 3.2.1 | Gráficos del dashboard |
| Lucide React | 0.544.0 | Iconografía |
| MediaPipe | CDN | Reconocimiento de gestos y rostro |

---

## Estructura del Proyecto

```
.
├── backend/
│   ├── core/                        # Configuración Django (settings, urls, wsgi)
│   ├── login/                       # Autenticación facial + JWT
│   │   ├── models/models.py         # Modelo Usuario personalizado
│   │   └── views/views.py           # API login/register facial
│   ├── operaciones/                 # Gestos matemáticos (0-50, +,-,×,÷)
│   │   ├── models.py                # GestoMano, HistorialReconocimiento, OperacionMatematica
│   │   └── views.py                 # APIs guardar/reconocer gestos
│   ├── vocales/                     # Reconocimiento de vocales (A,E,I,O,U)
│   ├── abecedario/                  # Reconocimiento de letras (A-Z)
│   ├── palabras/                    # Reconocimiento de palabras completas
│   ├── voz/                         # Reconocimiento de voz (Vosk offline)
│   ├── chatbot_educativo/           # Chatbot con IA scikit-learn
│   │   ├── services/chatbot_service.py  # Lógica del chatbot
│   │   ├── trained_models/          # Modelos .pkl entrenados
│   │   └── ai_agent/                # Pipeline de entrenamiento
│   ├── manage.py
│   ├── requirements.txt             # Dependencias completas (producción)
│   ├── requirements-local.txt       # Dependencias para desarrollo local
│   └── .env                         # Variables de entorno (creado en setup)
│
└── frontend/
    ├── src/
    │   ├── App.tsx                  # Rutas principales + ThemeContext
    │   ├── auth/                    # AuthFlowPage, userStore (Zustand)
    │   ├── components/
    │   │   ├── Blackboard/          # Navbar, Layout, HeroUnified, ProfileModal
    │   │   ├── FloatingChatWidget   # Widget del chatbot flotante
    │   │   └── LandingComponents/   # PromoCarousel, OurTeam, Benefits
    │   ├── pages/
    │   │   ├── landing/             # Landing page principal
    │   │   ├── Blackboard/          # Dashboard + módulos de práctica
    │   │   │   ├── Arithmetic/      # Captura, entrenamiento y práctica de números
    │   │   │   ├── Vocales/         # Módulo de vocales
    │   │   │   ├── Abecedario/      # Módulo de letras
    │   │   │   └── Palabras/        # Módulo de palabras
    │   │   └── Dashboard-admin/     # Panel estadístico con gráficos
    │   ├── contexts/ModelContext.tsx
    │   └── services/                # Servicios de API
    ├── package.json
    └── vite.config.ts               # Proxy al backend en desarrollo
```

---

## Requisitos Previos

- **Python 3.10+** (probado con 3.12)
- **Node.js 18+** (probado con 22)
- **npm 9+**
- Navegador moderno con soporte WebRTC (Chrome, Edge, Firefox)
- Cámara web (para funcionalidades de reconocimiento)

---

## Ejecución en Local

### Backend (Django)

**1. Crear y activar entorno virtual**

```bash
cd backend

# Crear venv
python -m venv .venv

# Activar en Windows
.venv\Scripts\activate

# Activar en Linux/Mac
source .venv/bin/activate
```

**2. Instalar dependencias**

```bash
# Opción A — dependencias locales (sin mysqlclient, vosk, pyaudio)
pip install -r requirements-local.txt

# Opción B — dependencias completas (requiere compiladores C++ para mysqlclient)
pip install -r requirements.txt
```

**3. Crear archivo `.env`**

```bash
# Copiar el ejemplo
cp .env.example .env
```

Contenido mínimo para desarrollo local:

```env
SECRET_KEY=django-local-dev-key-cualquier-valor-secreto
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
```

**4. Ejecutar migraciones**

```bash
python manage.py migrate
```

**5. (Opcional) Crear superusuario para el admin**

```bash
python manage.py createsuperuser
# Nota: el modelo usa email como USERNAME_FIELD
# Ejemplo: email=admin@senati.pe, dni=00000000, nombres=Admin, apellidos=Admin
```

**6. Arrancar el servidor**

```bash
python manage.py runserver
```

El backend queda disponible en: **http://127.0.0.1:8000/**

Panel de administración: **http://127.0.0.1:8000/admin/**

---

### Frontend (React + Vite)

**1. Instalar dependencias**

```bash
cd frontend
npm install
```

**2. Arrancar el servidor de desarrollo**

```bash
npm run dev
```

El frontend queda disponible en: **http://localhost:5173/**

El proxy de Vite redirige automáticamente las llamadas a `/api`, `/operaciones`, `/chatbot`, `/vocales`, `/abecedario`, `/palabras`, `/voz` al backend en `http://127.0.0.1:8000`.

**3. Build de producción (opcional)**

```bash
npm run build
# Output en frontend/dist/
```

---

## Variables de Entorno

### Backend (`backend/.env`)

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `SECRET_KEY` | Clave secreta de Django | Insegura (solo dev) |
| `DEBUG` | Modo debug | `True` |
| `ALLOWED_HOSTS` | Hosts permitidos (coma-separados) | `127.0.0.1,localhost` |
| `DATABASE_URL` | URL de BD (vacío = SQLite) | vacío |
| `DB_ENGINE` | `mysql` para usar MySQL | — |
| `MYSQL_DATABASE` | Nombre de la BD MySQL | `app_db` |
| `MYSQL_USER` | Usuario MySQL | `root` |
| `MYSQL_PASSWORD` | Contraseña MySQL | `mysql` |
| `MYSQL_HOST` | Host MySQL | `127.0.0.1` |
| `MYSQL_PORT` | Puerto MySQL | `3306` |
| `CORS_ALLOWED_ORIGINS` | Orígenes CORS permitidos | `http://localhost:5173` |
| `CSRF_TRUSTED_ORIGINS` | Orígenes CSRF confiables | `http://localhost:5173` |

---

## Endpoints API

### Autenticación (`/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/login/` | Página de login |
| GET | `/register/` | Página de registro |
| POST | `/api/login/` | Login facial (JSON: email, facial_frame, position_data) |
| POST | `/api/register-basic/` | Registro básico (JSON: nombres, apellidos, email, dni) |
| POST | `/api/encode/` | Obtener embedding facial de un frame base64 |
| POST | `/api/validate-user/` | Validar usuario por email + DNI |
| GET | `/api/db-check/` | Verificar conexión a BD |
| GET | `/logout/` | Cerrar sesión |

### Operaciones Matemáticas (`/operaciones/` y `/api/operaciones/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/operaciones/gestos-entrenados/` | Listar gestos entrenados |
| POST | `/operaciones/guardar-gesto/` | Guardar/actualizar gesto |
| POST | `/operaciones/reconocer-gesto/` | Reconocer gesto de una mano |
| POST | `/operaciones/reconocer-dos-manos/` | Reconocer dos manos simultáneas |
| POST | `/operaciones/calcular-operacion/` | Calcular operación matemática |
| DELETE | `/operaciones/eliminar-gesto/<id>/` | Eliminar gesto |

### Vocales (`/vocales/` y `/api/vocales/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/vocales/gestos_entrenados/` | Listar vocales entrenadas |
| POST | `/vocales/api/guardar-gesto/` | Guardar vocal |
| POST | `/vocales/api/reconocer-gesto/` | Reconocer vocal |
| DELETE | `/vocales/eliminar-gesto/<id>/` | Eliminar vocal |

### Abecedario (`/abecedario/` y `/api/abecedario/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/abecedario/gestos_entrenados/` | Listar letras entrenadas |
| POST | `/abecedario/api/guardar-gesto/` | Guardar letra |
| POST | `/abecedario/api/reconocer-gesto/` | Reconocer letra |

### Palabras (`/palabras/` y `/api/palabras/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/palabras/gestos_entrenados/` | Listar palabras entrenadas |
| POST | `/palabras/api/guardar-gesto/` | Guardar palabra |
| POST | `/palabras/api/reconocer-gesto/` | Reconocer palabra |

### Chatbot (`/chatbot/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/chatbot/` | Interfaz web del chatbot |
| POST | `/chatbot/api/chat/` | Enviar mensaje (JSON: message, session_id) |
| GET | `/chatbot/api/health/` | Estado del servicio |
| GET | `/chatbot/api/history/` | Historial de chats |
| POST | `/chatbot/api/clear-session/` | Limpiar sesión |

### Voz (`/voz/`)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/voz/api/register_audio/` | Registrar perfil de voz |
| POST | `/voz/api/recognize_command/` | Reconocer comando de voz |
| GET | `/voz/api/voice_status/` | Estado del reconocimiento |

---

## Rutas del Frontend

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Landing` | Página de inicio con presentación |
| `/splash` | `SplashScreen` | Pantalla de carga |
| `/auth` | `AuthFlowPage` | Registro e inicio de sesión facial |
| `/blackboard` | `Blackboard` | Dashboard principal del usuario |
| `/blackboard/models` | `Models` | Gestión de modelos guardados |
| `/arithmetic/capture` | `CaptureSamples` | Captura de muestras de gestos numéricos |
| `/arithmetic/train` | `TrainModel` | Entrenamiento del modelo de gestos |
| `/arithmetic/practice/operaciones` | `PracticeOperations` | Práctica de operaciones matemáticas |
| `/arithmetic/practice/numeros` | `PracticeNumeros` | Práctica de números |
| `/vocales/capture` | `CaptureSamplesVocales` | Captura de vocales |
| `/vocales/train` | `TrainModelVocales` | Entrenamiento de vocales |
| `/vocales/practice` | `PracticeVocales` | Práctica de vocales |
| `/abecedario/capture` | `CaptureSamplesAbecedario` | Captura de letras |
| `/abecedario/train` | `TrainModelAbecedario` | Entrenamiento de letras |
| `/abecedario/practice` | `PracticeAbecedario` | Práctica del abecedario |
| `/palabras/capture` | `CaptureSamplesPalabras` | Captura de palabras |
| `/palabras/train` | `TrainModelPalabras` | Entrenamiento de palabras |
| `/palabras/practice` | `PracticePalabras` | Práctica de palabras |
| `/estadistica` | `Dashboard_admin` | Panel administrativo (solo @senati.pe) |

---

## Funcionalidades

### Reconocimiento de Gestos con MediaPipe
- Captura de landmarks de manos en tiempo real via cámara web
- Entrenamiento personalizado: el usuario graba muestras y el backend las almacena
- Reconocimiento de números del 0 al 50 con una o dos manos
- Reconocimiento de operaciones matemáticas (+, -, ×, ÷)
- Reconocimiento de vocales (A, E, I, O, U)
- Reconocimiento de letras del abecedario
- Reconocimiento de palabras completas

### Chatbot Educativo con IA
- Modelo scikit-learn (TF-IDF + Naive Bayes / Logistic Regression / SVM)
- Clasificación de intenciones del usuario
- Respuestas contextuales con redirección a secciones relevantes
- Widget flotante disponible en toda la aplicación
- Historial de conversaciones persistido en BD

### Autenticación Biométrica
- Registro facial con múltiples muestras (mayor precisión)
- Login facial con comparación de embeddings
- Fallback a validación por email + DNI
- Usuarios administradores identificados por dominio `@senati.pe`

### Dashboard Administrativo
- Métricas de usuarios, sesiones y actividad
- Gráficos interactivos (Recharts): ingresos, cohortes, embudo de conversión
- Estado de servidores y métricas de API
- Exportación de datos a CSV
- Solo accesible para usuarios con email `@senati.pe`

### Reconocimiento de Voz (opcional)
- Reconocimiento offline con Vosk (requiere modelo descargado)
- Registro de perfiles de voz con consentimiento
- Comandos de voz configurables

---

## Notas sobre dependencias opcionales

### `face_recognition` (reconocimiento facial avanzado)
No está en `requirements-local.txt` porque requiere `dlib` y compiladores C++. El sistema funciona sin él usando un fallback basado en píxeles. Para instalarlo:

```bash
# Requiere Visual Studio Build Tools en Windows
pip install face_recognition
```

### `vosk` + `pyaudio` (reconocimiento de voz offline)
El módulo de voz funciona sin estos paquetes (el servicio los importa con `try/except`). Para activar el reconocimiento de voz:

```bash
pip install vosk pyaudio
```

Además, descargar el modelo de Vosk en español:
```
backend/voz/models/vosk-model-small-es-0.42/
```
Descarga: https://alphacephei.com/vosk/models

### `mysqlclient` (base de datos MySQL)
Solo necesario si se usa MySQL en lugar de SQLite:

```bash
# Requiere MySQL Connector/C instalado
pip install mysqlclient
```

---

## Comandos útiles

```bash
# Backend — crear migraciones nuevas
python manage.py makemigrations

# Backend — ver estado de migraciones
python manage.py showmigrations

# Backend — shell interactivo de Django
python manage.py shell

# Backend — recolectar estáticos (producción)
python manage.py collectstatic --no-input

# Frontend — lint
npm run lint

# Frontend — preview del build de producción
npm run preview
```

---

## Deployment en Render (producción)

El archivo `build.sh` automatiza el deployment en Render:

```bash
bash build.sh
```

Pasos que ejecuta:
1. `pip install -r requirements.txt`
2. `python manage.py collectstatic --no-input`
3. `python manage.py migrate`
4. Crea superusuario `admin` si no existe
5. Inicializa el servicio del chatbot

Configurar en Render:
- **Build Command:** `bash build.sh`
- **Start Command:** `gunicorn core.wsgi:application`
- **Environment Variables:** las del archivo `.env.example`

---

*AresDigitalAcademy — Plataforma ML educativa*
