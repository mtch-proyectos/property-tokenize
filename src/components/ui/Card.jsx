import { Link } from 'react-router-dom';
import './Card.css';

/**
 * Card MD3 base. Variantes: elevated | filled | outlined.
 * Puede actuar como enlace (prop `to`) para tarjetas clicables.
 *
 * Componentes como PropertyCard o StatCard se construyen sobre esta base.
 */
export default function Card({
  variant = 'elevated',
  interactive = false,
  to,
  as: Tag = 'article',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'md-card',
    `md-card--${variant}`,
    interactive || to ? 'md-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        <span className="md-card__state" aria-hidden="true" />
        {children}
      </Link>
    );
  }

  return (
    <Tag className={classes} {...rest}>
      {(interactive) && <span className="md-card__state" aria-hidden="true" />}
      {children}
    </Tag>
  );
}

/** Zona de medios (imagen) de una card. */
export function CardMedia({ src, alt = '', aspect = '16 / 10', children, className = '' }) {
  return (
    <div className={`md-card__media ${className}`.trim()} style={{ aspectRatio: aspect }}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      {children}
    </div>
  );
}

/** Cuerpo con padding estándar de una card. */
export function CardContent({ children, className = '' }) {
  return <div className={`md-card__content ${className}`.trim()}>{children}</div>;
}

/** Fila de acciones al pie de una card. */
export function CardActions({ children, className = '' }) {
  return <div className={`md-card__actions ${className}`.trim()}>{children}</div>;
}
