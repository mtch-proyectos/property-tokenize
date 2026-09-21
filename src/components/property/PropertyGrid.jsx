import PropertyCard from './PropertyCard';
import Icon from '../ui/Icon';
import './PropertyGrid.css';

/** Rejilla responsiva de tarjetas de propiedad con estado vacío. */
export default function PropertyGrid({ properties, emptyMessage = 'No hay propiedades que coincidan con los filtros.' }) {
  if (!properties.length) {
    return (
      <div className="pt-property-grid__empty">
        <Icon name="search_off" size={48} />
        <p className="body-large text-on-surface-variant">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="pt-property-grid">
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </ul>
  );
}
