import Button from '../ui/Button';
import './CtaBanner.css';

/** Banner de llamada a la acción reutilizable. */
export default function CtaBanner({
  title = 'Empieza a construir tu portafolio inmobiliario hoy',
  description = 'Explora las propiedades disponibles, simula tu inversión y adquiere los tokens que se ajusten a tu presupuesto.',
  primaryLabel = 'Ver propiedades',
  primaryTo = '/propiedades',
  secondaryLabel = 'Hablar con un asesor',
  secondaryTo = '/contacto',
}) {
  return (
    <section className="pt-cta">
      <div className="pt-container">
        <div className="pt-cta__box">
          <div className="pt-cta__text">
            <h2 className="headline-small">{title}</h2>
            <p className="body-large">{description}</p>
          </div>
          <div className="pt-cta__actions">
            <Button to={primaryTo} variant="inverse" icon="arrow_forward">
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="text" className="pt-cta__secondary">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
