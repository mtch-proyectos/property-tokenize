/**
 * Contenido editorial del sitio (textos, pasos, FAQ, equipo).
 */

export const NAV_LINKS = [
  { to: '/', label: 'Inicio', icon: 'home', end: true },
  { to: '/propiedades', label: 'Propiedades', shortLabel: 'Inmuebles', icon: 'apartment' },
  { to: '/como-funciona', label: 'Cómo funciona', shortLabel: 'Guía', icon: 'school' },
  { to: '/nosotros', label: 'Nosotros', icon: 'groups' },
  { to: '/contacto', label: 'Contacto', icon: 'mail' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    icon: 'domain_add',
    title: 'El propietario registra su inmueble',
    description:
      'Un propietario inscribe su edificio en Property Tokenize. Tras la auditoría legal y el avalúo, la propiedad se divide en un número fijo de tokens, por ejemplo 1.000.',
  },
  {
    icon: 'search',
    title: 'Tú exploras las oportunidades',
    description:
      'Revisas el detalle de cada propiedad: su uso (coworking, residencial, comercial…), su ocupación, el rendimiento proyectado y la documentación de respaldo.',
  },
  {
    icon: 'shopping_cart',
    title: 'Compras la fracción que quieras',
    description:
      'Decides cuánto invertir. Si compras 250 de los 1.000 tokens de un edificio, pasas a ser dueño del 25% de esa propiedad.',
  },
  {
    icon: 'payments',
    title: 'Recibes dividendos proporcionales',
    description:
      'Las rentas que genera la propiedad se distribuyen entre todos los tenedores según su porcentaje. Con el 25% de los tokens, recibes el 25% del dividendo.',
  },
];

export const BENEFITS = [
  {
    icon: 'savings',
    title: 'Inversión desde montos accesibles',
    description:
      'No necesitas comprar un edificio completo. Adquiere solo la cantidad de tokens que se ajuste a tu presupuesto.',
  },
  {
    icon: 'pie_chart',
    title: 'Diversificación real',
    description:
      'Reparte tu capital entre coworkings, residencias, hoteles y naves logísticas en distintas ciudades.',
  },
  {
    icon: 'verified_user',
    title: 'Transparencia total',
    description:
      'Cada propiedad publica su avalúo, contratos, ocupación y proyecciones antes de abrir el financiamiento.',
  },
  {
    icon: 'account_balance_wallet',
    title: 'Ingresos pasivos recurrentes',
    description:
      'Los dividendos se distribuyen de forma periódica y automática de acuerdo con tu participación.',
  },
];

export const PLATFORM_STATS = [
  { value: 18.4, prefix: '$', suffix: 'M', label: 'Valor en propiedades tokenizadas', format: 'decimal' },
  { value: 2480, label: 'Inversores activos', format: 'integer' },
  { value: 8.6, suffix: '%', label: 'Rendimiento anual promedio', format: 'decimal' },
  { value: 6, label: 'Países con propiedades', format: 'integer' },
];

export const FAQS = [
  {
    question: '¿Qué es un token de propiedad?',
    answer:
      'Es una fracción digital de un inmueble. Cada propiedad se registra con un número fijo de tokens y cada token representa una parte idéntica de esa propiedad y de los ingresos que genera.',
  },
  {
    question: '¿Cómo se calcula mi porcentaje de participación?',
    answer:
      'Dividiendo los tokens que compras entre el total de tokens de la propiedad. Si un edificio tiene 1.000 tokens y compras 250, tu participación es del 25%.',
  },
  {
    question: '¿Cómo y cuándo recibo los dividendos?',
    answer:
      'Cada propiedad define su periodicidad (mensual o trimestral). El ingreso neto del período se reparte entre todos los tenedores en proporción a sus tokens.',
  },
  {
    question: '¿Puedo vender mis tokens?',
    answer:
      'Sí. Estamos habilitando un mercado secundario dentro de la plataforma para que puedas ofrecer tus tokens a otros inversores.',
  },
  {
    question: '¿Qué pasa si la propiedad no genera ingresos un mes?',
    answer:
      'Los dividendos dependen del desempeño real de cada inmueble. Por eso publicamos la ocupación histórica, los contratos vigentes y las proyecciones para que tomes decisiones informadas.',
  },
  {
    question: '¿Cuál es el monto mínimo de inversión?',
    answer:
      'Cada propiedad define un mínimo de tokens. En la mayoría de los casos puedes empezar con un solo token, cuyo precio depende del valor total del inmueble.',
  },
];

export const TEAM = [
  { name: 'Valentina Ríos', role: 'CEO & Cofundadora', icon: 'person' },
  { name: 'Andrés Mejía', role: 'Director de Inversiones', icon: 'person' },
  { name: 'Lucía Fernández', role: 'Directora Legal', icon: 'person' },
  { name: 'Tomás Herrera', role: 'CTO', icon: 'person' },
];

export const VALUES = [
  {
    icon: 'handshake',
    title: 'Confianza',
    description: 'Cada inmueble pasa por auditoría legal, avalúo independiente y verificación de contratos.',
  },
  {
    icon: 'public',
    title: 'Acceso',
    description: 'Democratizamos la inversión inmobiliaria para que cualquier persona pueda participar.',
  },
  {
    icon: 'insights',
    title: 'Claridad',
    description: 'Información completa y en lenguaje sencillo sobre riesgos, rendimientos y costos.',
  },
];

export const CONTACT_INFO = [
  { icon: 'mail', label: 'Correo', value: 'hola@propertytokenize.com' },
  { icon: 'call', label: 'Teléfono', value: '+507 300 1234' },
  { icon: 'location_on', label: 'Oficina', value: 'Torre Nexus, Calle 50, Ciudad de Panamá' },
  { icon: 'schedule', label: 'Horario', value: 'Lunes a viernes, 9:00 – 18:00' },
];
