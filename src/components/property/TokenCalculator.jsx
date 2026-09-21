import { useMemo, useState } from 'react';
import Card, { CardContent } from '../ui/Card';
import Slider from '../ui/Slider';
import TextField from '../ui/TextField';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { getAvailableTokens, getTokenPrice, simulateInvestment, tokensForAmount } from '../../utils/tokens';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/format';
import './TokenCalculator.css';

/**
 * Simulador de inversión. El usuario elige cuántos tokens comprar (o cuánto
 * dinero invertir) y ve su porcentaje de participación y dividendos estimados.
 *
 * Implementa la regla de negocio: participación = tokens / tokens totales,
 * dividendo = participación × dividendo total de la propiedad.
 */
export default function TokenCalculator({ property, initialTokens }) {
  const available = getAvailableTokens(property);
  const tokenPrice = getTokenPrice(property);
  const minTokens = Math.min(property.minTokens, available);
  const defaultTokens = Math.min(initialTokens ?? Math.max(Math.round(property.totalTokens * 0.05), minTokens), available);

  const [tokens, setTokens] = useState(defaultTokens);
  const [amountInput, setAmountInput] = useState('');

  const result = useMemo(() => simulateInvestment(property, tokens), [property, tokens]);
  const isClosed = available === 0;
  const belowMin = tokens > 0 && tokens < property.minTokens;

  const handleTokensChange = (value) => {
    const next = Math.min(Math.max(Math.floor(Number(value) || 0), 0), available);
    setTokens(next);
    setAmountInput('');
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value;
    setAmountInput(raw);
    const next = Math.min(tokensForAmount(property, Number(raw)), available);
    setTokens(next);
  };

  return (
    <Card variant="filled" className="pt-calculator">
      <CardContent>
        <header className="pt-calculator__header">
          <Icon name="calculate" className="text-primary" />
          <div>
            <h3 className="title-large">Simula tu inversión</h3>
            <p className="body-medium text-on-surface-variant">
              {isClosed
                ? 'Esta propiedad ya completó su financiamiento.'
                : `Precio por token: ${formatCurrency(tokenPrice, { precise: true })} · Mínimo ${formatNumber(property.minTokens)} ${property.minTokens === 1 ? 'token' : 'tokens'}`}
            </p>
          </div>
        </header>

        {!isClosed && (
          <>
            <div className="pt-calculator__inputs">
              <TextField
                label="Cantidad de tokens"
                type="number"
                min={0}
                max={available}
                value={tokens}
                onChange={(e) => handleTokensChange(e.target.value)}
                error={belowMin ? `El mínimo es ${property.minTokens} tokens` : undefined}
                supportingText={`Hasta ${formatNumber(available)} disponibles`}
              />
              <TextField
                label="O ingresa un monto"
                type="number"
                min={0}
                prefix="$"
                value={amountInput}
                onChange={handleAmountChange}
                supportingText="Se convierte a tokens completos"
              />
            </div>

            <Slider
              label={`${formatNumber(tokens)} tokens de ${formatNumber(property.totalTokens)}`}
              min={0}
              max={available}
              value={tokens}
              onChange={handleTokensChange}
              aria-label="Cantidad de tokens"
            />
          </>
        )}

        <dl className="pt-calculator__results">
          <div className="pt-calculator__result">
            <dt className="label-medium">Inversión total</dt>
            <dd className="headline-small">{formatCurrency(result.investment)}</dd>
          </div>
          <div className="pt-calculator__result">
            <dt className="label-medium">Tu participación</dt>
            <dd className="headline-small text-primary">{formatPercent(result.ownershipPercent, 2)}</dd>
          </div>
          <div className="pt-calculator__result">
            <dt className="label-medium">Dividendo anual est.</dt>
            <dd className="headline-small">{formatCurrency(result.annualDividend)}</dd>
          </div>
          <div className="pt-calculator__result">
            <dt className="label-medium">Dividendo mensual est.</dt>
            <dd className="headline-small">{formatCurrency(result.monthlyDividend, { precise: true })}</dd>
          </div>
        </dl>

        <p className="pt-calculator__explain body-medium">
          <Icon name="info" size={18} />
          <span>
            Con <strong>{formatNumber(result.tokens)}</strong> de{' '}
            <strong>{formatNumber(property.totalTokens)}</strong> tokens posees el{' '}
            <strong>{formatPercent(result.ownershipPercent, 2)}</strong> de la propiedad y recibes ese
            mismo porcentaje del dividendo que genere (rendimiento proyectado:{' '}
            {formatPercent(property.projectedYield)} anual).
          </span>
        </p>

        <Button
          variant="filled"
          icon={isClosed ? 'notifications' : 'shopping_cart'}
          fullWidth
          disabled={!isClosed && (tokens === 0 || belowMin)}
          to="/contacto"
        >
          {isClosed ? 'Avisarme de nuevas oportunidades' : 'Quiero invertir'}
        </Button>
      </CardContent>
    </Card>
  );
}
