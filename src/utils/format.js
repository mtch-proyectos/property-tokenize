/**
 * Helpers de formato (moneda, porcentaje, números) para toda la UI.
 */
// es-CO produce "$ 2.500.000" (símbolo delante, separador de miles con punto).
const CURRENCY_LOCALE = 'es-CO';

const currencyFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
});

const currencyPreciseFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('es-ES');

export const formatCurrency = (value, { precise = false } = {}) =>
  (precise ? currencyPreciseFormatter : currencyFormatter).format(value ?? 0);

export const formatNumber = (value) => numberFormatter.format(value ?? 0);

export const formatPercent = (value, digits = 1) =>
  `${(value ?? 0).toLocaleString('es-ES', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;

export const formatCompact = (value) =>
  new Intl.NumberFormat('es-ES', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value ?? 0);
