# Guía de Accesibilidad para Videojuegos

Una plataforma web interactiva que ayuda a descubrir videojuegos accesibles. Encuentra juegos que se adapten a tus necesidades filtrando por precio, dificultad, requisitos técnicos, idioma y plataforma.

## 🎮 Características Principales

- **Filtros Inteligentes**: Encuentra juegos según tu presupuesto, experiencia, hardware disponible e idioma preferido
- **Interfaz Intuitiva**: Navegación clara con iconos descriptivos y diseño responsivo
- **Información Detallada**: Datos actualizados sobre barreras de entrada y requisitos de cada juego
- **Inclusión Digital**: Diseñado pensando en la accesibilidad y diversidad de usuarios
- **Multiplataforma**: Compatible con escritorio y dispositivos móviles

## 🌟 ¿Para Quién es Esta Guía?

- **Nuevos Jugadores**: Personas que quieren empezar a jugar videojuegos
- **Gamers Ocasionales**: Usuarios que buscan entretenimiento sin grandes barreras
- **Familias**: Padres buscando juegos apropiados para sus hijos
- **Comunidad Inclusiva**: Personas con diferentes necesidades de accesibilidad
- **Educadores**: Profesionales que buscan herramientas lúdicas educativas

## 🛠️ Tecnologías Utilizadas

- React con TypeScript para una experiencia robusta
- Diseño responsivo y accesible
- Iconografía moderna y descriptiva
- Datos actualizados regularmente

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Configuración del proyecto

```bash
# Clonar el repositorio
git clone <repository-url>
cd videogames

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción  
npm run preview
```

### Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run lint` - Linting con ESLint
- `npm run preview` - Previsualizar build
- `npm run fetch-games` - Actualizar datos de juegos

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── GameCard.tsx    # Tarjeta individual de juego
│   ├── GameFilters.tsx # Filtros de búsqueda
│   ├── GamesGrid.tsx   # Grid de juegos
│   ├── Header.tsx      # Cabecera de la aplicación
│   └── IconLegend.tsx  # Leyenda de iconos
├── hooks/              # Custom React hooks
│   ├── useGames.ts     # Hook para manejo de juegos
│   ├── useGameConfig.ts # Hook para configuración
│   └── useGameFilters.ts # Hook para filtros
├── types/              # Definiciones de TypeScript
│   └── game.ts         # Tipos relacionados con juegos
├── utils/              # Funciones utilitarias
│   ├── iconUtils.tsx   # Utilidades para iconos
│   ├── formatUtils.ts  # Formateo de datos
│   ├── filterUtils.ts  # Lógica de filtros
│   └── interactionUtils.ts # Utilidades de interacción
├── constants/          # Constantes de la aplicación
│   ├── index.ts        # Constantes generales
│   ├── gameConfig.ts   # Configuraciones de juegos
│   └── messages.ts     # Mensajes y textos
└── App.tsx             # Componente principal
```

## 🎨 Características de Diseño

### Sistema de Iconos
- **Precio**: Desde gratis (🎁) hasta caro (💰)
- **Dificultad**: Principiante (😊), Casual (👤), Experimentado (⚔️)
- **Requisitos**: Cualquier PC (📱), PC Decente (🖥️), PC Potente (🎮)
- **Idioma**: Español disponible (✅), Solo inglés (🌍)

### Filtros Inteligentes
- **Precio jerárquico**: Los filtros incluyen precios menores automáticamente
- **Requisitos escalonados**: Cada nivel incluye requisitos menores
- **Plataformas múltiples**: Soporte para Windows, macOS y Linux

## 🔧 Configuración de Datos

### Actualización de juegos
Los datos de juegos se obtienen mediante el script `fetchGameData.ts`:

```bash
npm run fetch-games
```

### Estructura de datos
- `public/data/gamesData.json` - Datos principales de juegos
- `public/data/gameConfig.json` - Configuración manual (dificultad, idiomas, plataformas)
- `public/data/gameIds.json` - IDs de juegos a procesar

## 🧪 Desarrollo

### Principios de Clean Code aplicados
- **Separación de responsabilidades**: Cada función tiene una responsabilidad única
- **Nombres descriptivos**: Variables y funciones con nombres claros
- **Constantes centralizadas**: Sin magic numbers o strings
- **Tipado estricto**: TypeScript configurado con reglas estrictas
- **Componentes pequeños**: Componentes focused y reutilizables

### Arquitectura
- **Hooks personalizados** para lógica de estado
- **Utilidades puras** para operaciones comunes
- **Constantes organizadas** por dominio
- **Tipos bien definidos** para todas las entidades

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Steam API** por los datos de juegos
- **Phosphor Icons** por la iconografía
- **Comunidad React** por las mejores prácticas

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
