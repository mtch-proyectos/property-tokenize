import LinearProgress from '../ui/LinearProgress';
import { getAvailableTokens, getFundedPercent } from '../../utils/tokens';
import { formatNumber, formatPercent } from '../../utils/format';
import './TokenProgress.css';

/**
 * Muestra el avance de financiamiento de una propiedad:
 * tokens vendidos vs. totales, con barra de progreso.
 */
export default function TokenProgress({ property, compact = false }) {
  const funded = getFundedPercent(property);
  const available = getAvailableTokens(property);
  const tone = funded >= 100 ? 'secondary' : funded >= 85 ? 'tertiary' : 'primary';

  return (
    <div className={`pt-token-progress ${compact ? 'pt-token-progress--compact' : ''}`}>
      <div className="pt-token-progress__row">
        <span className="label-large text-on-surface">{formatPercent(funded, 0)} financiado</span>
        <span className="body-small text-on-surface-variant">
          {formatNumber(property.tokensSold)} / {formatNumber(property.totalTokens)} tokens
        </span>
      </div>
      <LinearProgress value={funded} tone={tone} label={`Financiado ${formatPercent(funded, 0)}`} />
      {!compact && (
        <p className="body-small text-on-surface-variant">
          {available > 0
            ? `${formatNumber(available)} tokens disponibles`
            : 'Financiamiento completado'}
        </p>
      )}
    </div>
  );
}
