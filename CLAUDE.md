# WEBSITE STANDARDS & BUSINESS RULES

## TECH STACK & PATTERNS
- Para el desarrollo de las vistas y el sitio web, quiero que manejes React Js como libreria para la creacion de interfaces.

Estilos: Estilos parecidos a los de Google (Material Design 3)

Componentes: Modulares, utilizar buenas practicas de desarrollo y herencia

Persistencia: Por los momentos es un sitio web informativo, no vamos a realizar ningun tipo de conexion con alguna base de datos por los momentos.

## REGLAS DE NEGOCIO

- Property Tokenize es una empresa que se encarga de vender propiedades pero por porciones tokenizadas, es decir, un cliente final puede gastar N cantidad de dinero, por una porcion de la propiedad, luego el dividendo que genere esa propiedad sera distribuido entre aquellas personas que adquieran el % basado en la cantidad de tokens adquiridos. Por ejemplo:

Un edificio de X propietario, se registro en esta propiedad con 1000 tokens. Luego un usuario de la plataforma vio el detalle del edificio y noto que sera utilizado para alquilar sus espacios en coworking. En base al posible rendimiento que generara el edificio, decidio comprar 250 tokens.

### Fórmulas (implementadas en `src/utils/tokens.js`)
- Precio por token = valor de la propiedad ÷ tokens totales
- Participación (%) = tokens comprados ÷ tokens totales × 100
- Dividendo anual de la propiedad = valor × rendimiento proyectado (%)
- Dividendo del inversor = dividendo anual × participación
- Tokens disponibles = tokens totales − tokens vendidos (nunca se vende más de lo disponible)
- Cada propiedad define `minTokens` (mínimo de compra)

Cualquier cálculo de tokens/dividendos en la UI debe pasar por estas funciones, no reimplementarse en componentes.

---

# IMPLEMENTACIÓN ACTUAL

## Stack
- React 19 + Vite 8 (`npm run dev` → http://localhost:5173, `npm run build`, `npm run lint` con oxlint)
- `react-router-dom` (BrowserRouter). Rutas en `src/App.jsx`.
- CSS plano, sin frameworks ni librerías de componentes. No instalar MUI/Tailwind/etc.
- Fuentes por Google Fonts en `index.html`: Roboto, Roboto Flex y Material Symbols Rounded.
- Idioma de la UI: español. Moneda: USD formateada con locale `es-CO` (`$ 2.500.000`).

## Estructura de carpetas
```
src/
├── styles/tokens.css      Design tokens MD3 (color, forma, elevación, tipografía, motion, state layers)
├── styles/base.css        Reset, clases de type scale (.headline-medium, .body-large…), .pt-container
├── data/properties.js     Catálogo de propiedades (datos estáticos) + PROPERTY_TYPES / PROPERTY_STATUS
├── data/content.js        Textos editoriales: NAV_LINKS, pasos, beneficios, FAQ, equipo, contacto
├── utils/tokens.js        Reglas de negocio (ver fórmulas arriba)
├── utils/format.js        formatCurrency / formatNumber / formatPercent
├── hooks/usePageTitle.js  Título del documento por página
├── components/ui/         Primitivos MD3 reutilizables
├── components/layout/     Layout, TopAppBar, NavigationBar (móvil), Footer, Section, Logo
├── components/property/   PropertyCard, PropertyGrid, PropertyFilters, TokenProgress, TokenCalculator
├── components/home/       Hero, StatsBand, FeatureCard, CtaBanner, FaqList
└── pages/                 HomePage, PropertiesPage, PropertyDetailPage, HowItWorksPage, AboutPage, ContactPage, NotFoundPage
```

## Convenciones de componentes
- Un componente por archivo, con su CSS al lado (`Button.jsx` + `Button.css`). Importar el CSS desde el componente.
- Prefijos de clases CSS: `md-*` para primitivos MD3 (`components/ui`), `pt-*` para todo lo específico del sitio. Nomenclatura BEM (`.pt-card__title`, `.md-button--filled`).
- **Herencia por composición**: los componentes de dominio se construyen sobre los primitivos, nunca duplican sus estilos.
  - `Button` es la base → `IconButton`, `ExtendedFab` (mismo archivo). Variantes: `filled | tonal | outlined | text | elevated | inverse`. Acepta `to` (Link), `href` (a) o renderiza `<button>`.
  - `Card` es la base → `PropertyCard`, `FeatureCard`, `TokenCalculator`, tarjetas de equipo. Sub-partes: `CardMedia`, `CardContent`, `CardActions`. Variantes: `elevated | filled | outlined`.
  - `Section` envuelve cada bloque de página (contenedor + eyebrow/título/descripción). Tonos: `surface | low | high | primary`.
- Primitivos disponibles en `components/ui`: `Button`, `Card`, `Chip` (assist/filter + `tone`), `TextField` (outlined, label flotante, `multiline`, `error`, `prefix`), `Slider`, `LinearProgress`, `Icon` (Material Symbols, prop `name` y `filled`).
- Antes de crear un componente nuevo, revisar si se puede componer con los existentes.
- Estado local con hooks; no hay estado global ni contexto (no hace falta por ahora).
- Datos: siempre desde `src/data/*`. No hardcodear textos o propiedades dentro de componentes/páginas.
- Accesibilidad: labels en inputs, `aria-label` en icon buttons, `aria-pressed` en chips de filtro, `role="progressbar"` en progreso, foco visible.

## Reglas de estilo (Material Design 3)
- Usar **siempre** las variables de `tokens.css`: `--md-sys-color-*`, `--md-sys-shape-corner-*`, `--md-sys-elevation-*`, `--md-sys-typescale-*`. No escribir colores hex en componentes.
- Color semilla de la marca: `#006C4C` (verde). Primary/secondary/tertiary/error con sus `-container` y `on-*`.
- Tema oscuro: definido dos veces en `tokens.css` — `@media (prefers-color-scheme: dark)` (con `:root:not([data-theme='light'])`) y `:root[data-theme='dark']`. El conmutador en `Layout.jsx` guarda la preferencia en `localStorage` (`pt-theme`). Cualquier color nuevo debe añadirse en los tres bloques.
- Tipografía: aplicar la type scale con clases utilitarias (`.display-small`, `.headline-medium`, `.title-large`, `.body-medium`, `.label-large`…), no con `font-size` sueltos.
- Interacción: los elementos clicables usan un **state layer** (`.md-button__state`, `.md-card__state`, `.md-chip__state`) con opacidades `--md-sys-state-hover/focus/pressed-opacity`.
- Forma: botones y chips full/small radius, cards `medium/large`, cards destacadas `extra-large`.
- Superficies: `surface-container-low/high/highest` para jerarquía, no sombras arbitrarias. Elevación solo `--md-sys-elevation-1..5`.
- Responsive con breakpoints MD3: 600px (medium), 840px (expanded), 1024/1240px (large). Navegación: `TopAppBar` con links en ≥840px; `NavigationBar` inferior en <840px (los `NAV_LINKS` pueden tener `shortLabel` para la barra móvil).
- Respetar `prefers-reduced-motion` (ya está en `base.css`).

## Páginas y rutas
| Ruta | Página | Contenido |
| --- | --- | --- |
| `/` | HomePage | Hero (ilustración 1.000 tokens / 250 = 25%), StatsBand, pasos, destacadas (`featured: true`), beneficios, FAQ, CTA |
| `/propiedades` | PropertiesPage | Búsqueda (sin acentos) + filtros por tipo y estado con chips |
| `/propiedades/:id` | PropertyDetailPage | Galería, resumen, estructura de tokens, progreso, highlights, documentación, `TokenCalculator` (sticky en desktop, primero en móvil) |
| `/como-funciona` | HowItWorksPage | Pasos, ejemplo práctico del edificio de 1.000 tokens, simulador, FAQ |
| `/nosotros` | AboutPage | Misión, valores, equipo, CTA para propietarios |
| `/contacto` | ContactPage | Formulario con validación en cliente; el envío es simulado (no hay backend) |
| `*` | NotFoundPage | 404 |

## Modelo de datos de una propiedad (`src/data/properties.js`)
`id` (slug usado en la URL), `name`, `type` (clave de `PROPERTY_TYPES`: coworking | residential | commercial | hotel | logistics), `status` (clave de `PROPERTY_STATUS`: open | almostFunded | funded | comingSoon), `city`, `country`, `address`, `image`, `gallery[]`, `valuation`, `totalTokens`, `tokensSold`, `projectedYield` (% anual), `minTokens`, `area`, `floors`, `yearBuilt`, `occupancy`, `investors`, `summary`, `highlights[]`, `useOfFunds`, `documents[]`, `featured`.

Para añadir una propiedad basta agregar un objeto a este array; las páginas, filtros y cálculos se actualizan solos. Las imágenes son URLs de Unsplash; `CardMedia` oculta la imagen y muestra un degradado si falla la carga.

## Notas
- El formulario de contacto y el botón "Quiero invertir" no envían nada: el sitio es informativo.
- `dist/` es el build de producción; no editar a mano.
- `.claude/launch.json` define el servidor `dev` para previsualizar en el navegador integrado.
