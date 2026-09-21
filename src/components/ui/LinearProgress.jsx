import './LinearProgress.css';

/**
 * Indicador de progreso lineal MD3 (determinado).
 * @param {{ value: number, label?: string, tone?: 'primary'|'tertiary'|'secondary' }} props
 */
export default function LinearProgress({ value = 0, label, tone = 'primary', className = '' }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (
    <div
      className={`md-progress md-progress--${tone} ${className}`.trim()}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-label={label}
    >
      <div className="md-progress__track">
        <div className="md-progress__bar" style={{ width: `${clamped}%` }} />
        <span className="md-progress__stop" aria-hidden="true" />
      </div>
    </div>
  );
}
