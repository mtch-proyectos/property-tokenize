import { Link } from 'react-router-dom';
import Icon from './Icon';
import './Button.css';

/**
 * Botón MD3 base. Soporta las 5 variantes del sistema:
 * filled | tonal | outlined | text | elevated.
 *
 * Renderiza <button>, <a> o <Link> según las props recibidas, de modo que
 * el resto de componentes (IconButton, FAB) heredan este comportamiento.
 */
export default function Button({
  variant = 'filled',
  icon,
  trailingIcon,
  children,
  className = '',
  to,
  href,
  type = 'button',
  fullWidth = false,
  disabled = false,
  ...rest
}) {
  const classes = [
    'md-button',
    `md-button--${variant}`,
    icon ? 'md-button--with-icon' : '',
    fullWidth ? 'md-button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="md-button__state" aria-hidden="true" />
      {icon && <Icon name={icon} size={18} className="md-button__icon" />}
      <span className="md-button__label">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={18} className="md-button__icon" />}
    </>
  );

  // Los enlaces no soportan `disabled`; se emula con aria-disabled.
  const linkDisabledProps = disabled
    ? { 'aria-disabled': true, tabIndex: -1, onClick: (e) => e.preventDefault() }
    : {};

  if (to) {
    return (
      <Link to={to} className={classes} {...rest} {...linkDisabledProps}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest} {...linkDisabledProps}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}

/**
 * IconButton: especialización de Button para acciones solo con ícono.
 * Hereda variantes y comportamiento de navegación de Button.
 */
export function IconButton({ icon, label, variant = 'standard', filled = false, className = '', ...rest }) {
  return (
    <Button
      variant={variant}
      className={`md-icon-button ${className}`.trim()}
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon name={icon} filled={filled} />
    </Button>
  );
}

/**
 * FAB (Floating Action Button) extendido: hereda de Button.
 */
export function ExtendedFab({ icon, children, className = '', ...rest }) {
  return (
    <Button variant="fab" icon={icon} className={`md-fab ${className}`.trim()} {...rest}>
      {children}
    </Button>
  );
}
