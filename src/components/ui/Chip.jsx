import Icon from './Icon';
import './Chip.css';

/**
 * Chip MD3. Variantes: assist | filter | suggestion.
 * `selected` aplica el estilo de filtro activo.
 * `tone` permite colorear chips informativos (primary | secondary | tertiary | outline | error).
 */
export default function Chip({
  variant = 'assist',
  selected = false,
  icon,
  tone,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const Tag = onClick ? 'button' : 'span';
  const classes = [
    'md-chip',
    `md-chip--${variant}`,
    selected ? 'md-chip--selected' : '',
    tone ? `md-chip--tone-${tone}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      aria-pressed={onClick && variant === 'filter' ? selected : undefined}
      {...rest}
    >
      <span className="md-chip__state" aria-hidden="true" />
      {selected && variant === 'filter' ? (
        <Icon name="check" size={18} className="md-chip__icon" />
      ) : (
        icon && <Icon name={icon} size={18} className="md-chip__icon" />
      )}
      <span className="md-chip__label">{children}</span>
    </Tag>
  );
}
