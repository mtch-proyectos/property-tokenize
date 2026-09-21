import './Section.css';

/**
 * Sección de página con contenedor centrado y espaciado vertical uniforme.
 * `tone` cambia el fondo: surface | low | high | primary.
 */
export default function Section({
  id,
  tone = 'surface',
  eyebrow,
  title,
  description,
  align = 'left',
  children,
  className = '',
  contentClassName = '',
}) {
  return (
    <section id={id} className={`pt-section pt-section--${tone} ${className}`.trim()}>
      <div className={`pt-container ${contentClassName}`.trim()}>
        {(eyebrow || title || description) && (
          <header className={`pt-section__header pt-section__header--${align}`}>
            {eyebrow && <p className="pt-section__eyebrow label-large">{eyebrow}</p>}
            {title && <h2 className="pt-section__title headline-medium">{title}</h2>}
            {description && <p className="pt-section__description body-large">{description}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
