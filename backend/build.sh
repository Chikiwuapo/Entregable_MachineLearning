#!/usr/bin/env bash
# Build script for Render deployment
set -o errexit

echo "🚀 Starting build process..."

# Upgrade pip, wheel y setuptools al inicio
echo "📦 Upgrading pip, wheel, setuptools..."
pip install --upgrade pip wheel setuptools

# ─────────────────────────────────────────────────────────────────
# PASO 1: Instalar paquetes científicos grandes SÓLO desde wheels
# precompilados para evitar compilaciones desde fuente (tar.gz)
# que causan timeout en Render free plan.
# ─────────────────────────────────────────────────────────────────
echo "📦 Installing binary-only scientific packages..."
pip install \
    --only-binary=:all: \
    "numpy==1.26.4" \
    "scipy==1.13.1" \
    "scikit-learn==1.5.2" \
    "pandas==2.2.3" \
    "opencv-python-headless==4.10.0.84"

# ─────────────────────────────────────────────────────────────────
# PASO 2: Instalar el resto de dependencias (puras Python).
# Los paquetes del PASO 1 ya están instalados con las versiones
# exactas, pip los saltará sin intentar reinstalarlos.
# ─────────────────────────────────────────────────────────────────
echo "📦 Installing remaining Python dependencies..."
pip install --prefer-binary -r requirements.txt

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --no-input

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py migrate

# Create superuser (email es el USERNAME_FIELD del modelo)
echo "👤 Creating superuser (if needed)..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
email = 'admin@senati.pe'
if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(
        email=email,
        dni='00000000',
        nombres='Admin',
        apellidos='Render',
        password='Admin2026!'
    )
    print('Superuser created: ' + email)
else:
    print('Superuser already exists')
" || echo "Superuser creation skipped"

echo "✅ Build completed successfully!"
