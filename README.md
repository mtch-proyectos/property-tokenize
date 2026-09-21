# Property Tokenize — Sitio web

Sitio informativo de **Property Tokenize**, plataforma de inversión inmobiliaria fraccionada:
cada propiedad se divide en tokens, el inversor compra los que desee y recibe dividendos
proporcionales a su participación.

## Stack

- **React 19** + **Vite**
- **react-router-dom** para las rutas
- CSS plano con **design tokens de Material Design 3** (color, tipografía, forma, elevación,
  estados). Tema claro/oscuro con `prefers-color-scheme` y conmutador manual.
- Sin backend ni base de datos: todos los datos viven en `src/data/`.

## Scripts

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo (http://localhost:5173)
npm run build   # build de producción en dist/
npm run preview # previsualizar el build
npm run lint    # oxlint
```

## Estructura

```
src/
├── styles/            tokens.css (MD3 design tokens) · base.css (reset, type scale, layout)
├── data/              properties.js (catálogo) · content.js (textos, pasos, FAQ, equipo)
├── utils/             tokens.js (reglas de negocio) · format.js (moneda, %, números)
├── hooks/             usePageTitle.js
├── components/
│   ├── ui/            Primitivos MD3: Button (+IconButton, ExtendedFab), Card (+CardMedia,
│   │                  CardContent, CardActions), Chip, TextField, Slider, LinearProgress, Icon
│   ├── layout/        Layout, TopAppBar, NavigationBar (móvil), Footer, Section, Logo
│   ├── property/      PropertyCard, PropertyGrid, PropertyFilters, TokenProgress, TokenCalculator
│   └── home/          Hero, StatsBand, FeatureCard, CtaBanner, FaqList
└── pages/             Home, Properties, PropertyDetail, HowItWorks, About, Contact, NotFound
```

### Herencia / composición de componentes

Los componentes de dominio se construyen sobre los primitivos MD3 en lugar de duplicar estilos:

- `Button` es la base; `IconButton` y `ExtendedFab` lo especializan.
- `Card` es la base; `PropertyCard`, `FeatureCard`, `TokenCalculator` y las tarjetas de equipo
  la componen añadiendo su contenido.
- `Section` encapsula contenedor, espaciado y cabecera de cada bloque de página.

## Reglas de negocio (`src/utils/tokens.js`)

| Función | Cálculo |
| --- | --- |
| `getTokenPrice` | valor de la propiedad ÷ tokens totales |
| `getOwnershipPercent` | tokens comprados ÷ tokens totales × 100 |
| `getAnnualDividendPool` | valor × rendimiento proyectado |
| `simulateInvestment` | inversión, participación y dividendo anual/mensual para N tokens |

Ejemplo: edificio de 1.000 tokens → un inversor compra 250 → posee el 25 % y recibe el 25 %
del dividendo que genera la propiedad.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio (hero, cómo funciona, destacadas, beneficios, FAQ) |
| `/propiedades` | Catálogo con búsqueda y filtros por tipo/estado |
| `/propiedades/:id` | Detalle con galería, estructura de tokens y simulador de inversión |
| `/como-funciona` | Guía paso a paso con ejemplo práctico y simulador |
| `/nosotros` | Misión, valores y equipo |
| `/contacto` | Formulario (validación en cliente, sin envío real) |
