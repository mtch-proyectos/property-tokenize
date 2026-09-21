import { useId } from 'react';
import './Slider.css';

/**
 * Slider MD3 continuo basado en <input type="range">.
 * Muestra el porcentaje de progreso con un track activo/inactivo.
 */
export default function Slider({ label, value, min = 0, max = 100, step = 1, onChange, className = '', ...rest }) {
  const id = useId();
  const range = max - min || 1;
  const percent = ((value - min) / range) * 100;

  return (
    <div className={`md-slider ${className}`.trim()} style={{ '--_percent': `${percent}%` }}>
      {label && (
        <label htmlFor={id} className="md-slider__label label-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type="range"
        className="md-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        {...rest}
      />
    </div>
  );
}
