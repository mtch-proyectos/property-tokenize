import { PLATFORM_STATS } from '../../data/content';
import { formatNumber } from '../../utils/format';
import './StatsBand.css';

const formatStat = (stat) => {
  const num =
    stat.format === 'integer'
      ? formatNumber(stat.value)
      : stat.value.toLocaleString('es-ES', { maximumFractionDigits: 1 });
  return `${stat.prefix ?? ''}${num}${stat.suffix ?? ''}`;
};

/** Franja de cifras clave de la plataforma. */
export default function StatsBand() {
  return (
    <div className="pt-stats">
      <div className="pt-container">
        <ul className="pt-stats__list">
          {PLATFORM_STATS.map((stat) => (
            <li key={stat.label} className="pt-stats__item">
              <span className="pt-stats__value headline-medium">{formatStat(stat)}</span>
              <span className="pt-stats__label body-medium">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
