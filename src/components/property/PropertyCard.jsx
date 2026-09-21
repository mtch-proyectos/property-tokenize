import Card, { CardMedia, CardContent } from '../ui/Card';
import Chip from '../ui/Chip';
import Icon from '../ui/Icon';
import TokenProgress from './TokenProgress';
import { PROPERTY_STATUS, PROPERTY_TYPES } from '../../data/properties';
import { getTokenPrice } from '../../utils/tokens';
import { formatCurrency, formatPercent } from '../../utils/format';
import './PropertyCard.css';

/**
 * Tarjeta de propiedad. Especialización de <Card> (hereda variante, estado
 * de interacción y navegación) con la información clave para invertir.
 */
export default function PropertyCard({ property, variant = 'elevated' }) {
  const type = PROPERTY_TYPES[property.type];
  const status = PROPERTY_STATUS[property.status];
  const tokenPrice = getTokenPrice(property);

  return (
    <Card to={`/propiedades/${property.id}`} variant={variant} className="pt-property-card">
      <CardMedia src={property.image} alt={property.name}>
        <div className="pt-property-card__badges">
          <Chip tone={status.color} className="md-chip--small">
            {status.label}
          </Chip>
        </div>
      </CardMedia>

      <CardContent>
        <div className="pt-property-card__meta">
          <span className="pt-property-card__type label-medium">
            <Icon name={type.icon} size={16} /> {type.label}
          </span>
          <span className="pt-property-card__location body-small">
            <Icon name="location_on" size={16} /> {property.city}, {property.country}
          </span>
        </div>

        <h3 className="pt-property-card__title title-large">{property.name}</h3>

        <dl className="pt-property-card__stats">
          <div>
            <dt className="label-small">Rendimiento est.</dt>
            <dd className="title-medium text-primary">{formatPercent(property.projectedYield)}</dd>
          </div>
          <div>
            <dt className="label-small">Precio por token</dt>
            <dd className="title-medium">{formatCurrency(tokenPrice)}</dd>
          </div>
          <div>
            <dt className="label-small">Valor total</dt>
            <dd className="title-medium">{formatCurrency(property.valuation)}</dd>
          </div>
        </dl>

        <TokenProgress property={property} compact />
      </CardContent>
    </Card>
  );
}
