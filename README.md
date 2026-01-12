# Eventually 📅

Aplicación web para coordinar disponibilidad de reuniones entre equipos.

## 🚀 Cómo levantar el proyecto

```bash
# 1. Ir a la carpeta del proyecto
cd /Users/fcuppi/availability-scheduler

# 2. Instalar dependencias (solo la primera vez)
npm run install:all

# 3. Iniciar la aplicación
npm run dev
```

La app estará disponible en: **http://localhost:5173**

## 📁 Estructura del proyecto

```
availability-scheduler/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   │   ├── Calendar.jsx
│   │   │   └── AvailabilityMatrix.jsx
│   │   ├── pages/          # Páginas de la app
│   │   │   ├── Home.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   ├── EventPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── hooks/          # Custom hooks
│   │   │   └── useUser.jsx
│   │   ├── styles/         # CSS global
│   │   └── App.jsx
│   └── package.json
├── server/                 # Backend Node.js + Express
│   ├── index.js            # API endpoints
│   ├── database.js         # SQLite database
│   └── package.json
└── package.json            # Scripts principales
```

## ✨ Funcionalidades actuales

- ✅ Login con email (persistencia de sesión)
- ✅ Crear eventos con calendario drag-to-select
- ✅ Votar disponibilidad (Puedo / Me adapto / No puedo)
- ✅ Default verde al votar
- ✅ Vista matriz estilo Excel
- ✅ Indicador de meses con opciones
- ✅ Recomendaciones de mejores fechas
- ✅ Cerrar evento y confirmar fecha
- ✅ Tema claro/oscuro automático
- ✅ Auto-refresh cada 10 segundos

## 🔮 Mejoras pendientes sugeridas

### Nivel 1 (Quick wins)
- [ ] Notificaciones por email
- [ ] Compartir por WhatsApp
- [ ] Deadline de votación
- [ ] Toggle modo oscuro manual

### Nivel 2 (Diferenciadores)
- [ ] Horarios además de días
- [ ] Integración Google Calendar
- [ ] Comentarios en fechas
- [ ] Sugerencia automática con IA

## 🛠 Stack tecnológico

- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Styling**: CSS vanilla con variables

## 📝 Notas

- La base de datos se guarda en `server/scheduler.db`
- Los datos de sesión se guardan en localStorage del navegador
- El puerto del cliente es 5173, el del servidor es 3001

