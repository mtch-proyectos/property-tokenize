import './Icon.css';

/**
 * Ícono de Material Symbols (Rounded).
 * @param {{ name: string, filled?: boolean, size?: number, className?: string, label?: string }} props
 */
export default function Icon({ name, filled = false, size = 24, className = '', label, ...rest }) {
  return (
    <span
      className={`md-icon ${filled ? 'md-icon--filled' : ''} ${className}`.trim()}
      style={{ fontSize: size, width: size, height: size }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...rest}
    >
      {name}
    </span>
  );
}
