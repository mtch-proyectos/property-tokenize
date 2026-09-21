/**
 * Reglas de negocio de tokenización.
 *
 * Una propiedad se registra con un total de tokens (ej. 1000) y un valor.
 * Cada token representa una fracción idéntica de la propiedad. El dividendo
 * que genera la propiedad se distribuye entre los inversores de forma
 * proporcional a los tokens que poseen.
 *
 *   Ejemplo: edificio de 1000 tokens → un inversor compra 250 tokens
 *   → posee el 25% → recibe el 25% del dividendo distribuido.
 */

/** Precio de un token = valor total / tokens totales. */
export const getTokenPrice = (property) =>
  property.valuation / property.totalTokens;

/** Tokens todavía disponibles para la venta. */
export const getAvailableTokens = (property) =>
  Math.max(property.totalTokens - property.tokensSold, 0);

/** % de la propiedad ya financiado (0-100). */
export const getFundedPercent = (property) =>
  (property.tokensSold / property.totalTokens) * 100;

/** % de participación que otorga una cantidad de tokens (0-100). */
export const getOwnershipPercent = (property, tokens) =>
  (tokens / property.totalTokens) * 100;

/** Dividendo anual total que se estima que generará la propiedad. */
export const getAnnualDividendPool = (property) =>
  property.valuation * (property.projectedYield / 100);

/**
 * Calcula el resultado de una inversión hipotética en una propiedad.
 * Devuelve inversión, participación y dividendos estimados.
 */
export const simulateInvestment = (property, tokens) => {
  const safeTokens = Math.min(
    Math.max(Math.floor(tokens) || 0, 0),
    getAvailableTokens(property),
  );
  const tokenPrice = getTokenPrice(property);
  const ownership = getOwnershipPercent(property, safeTokens);
  const annualDividend = getAnnualDividendPool(property) * (ownership / 100);

  return {
    tokens: safeTokens,
    tokenPrice,
    investment: safeTokens * tokenPrice,
    ownershipPercent: ownership,
    annualDividend,
    monthlyDividend: annualDividend / 12,
  };
};

/** Convierte un monto en dinero a la cantidad de tokens que puede comprar. */
export const tokensForAmount = (property, amount) =>
  Math.floor((amount || 0) / getTokenPrice(property));
