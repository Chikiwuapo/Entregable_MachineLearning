#!/usr/bin/env bash
# Build script for Render deployment
set -o errexit

echo "🚀 Starting build process..."

# Upgrade pip e instalar con --prefer-binary para evitar compilaciones desde fuente
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
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
