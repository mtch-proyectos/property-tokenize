import Card, { CardContent } from '../ui/Card';
import Icon from '../ui/Icon';
import './FeatureCard.css';

/**
 * Tarjeta de característica/beneficio: ícono + título + descripción.
 * Especialización de <Card>. Con `step` muestra un número de paso.
 */
export default function FeatureCard({ icon, title, description, step, variant = 'filled' }) {
  return (
    <Card variant={variant} className="pt-feature-card">
      <CardContent>
        <div className="pt-feature-card__icon">
          <Icon name={icon} size={28} />
          {step !== undefined && <span className="pt-feature-card__step label-small">{step}</span>}
        </div>
        <h3 className="title-medium">{title}</h3>
        <p className="body-medium text-on-surface-variant">{description}</p>
      </CardContent>
    </Card>
  );
}
