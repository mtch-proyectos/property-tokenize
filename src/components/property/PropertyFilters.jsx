import Chip from '../ui/Chip';
import TextField from '../ui/TextField';
import { PROPERTY_STATUS, PROPERTY_TYPES } from '../../data/properties';
import './PropertyFilters.css';

/**
 * Barra de filtros: búsqueda por texto + chips de tipo y estado.
 * Componente controlado: recibe el estado de filtros y notifica cambios.
 */
export default function PropertyFilters({ filters, onChange, resultCount }) {
  const setFilter = (key, value) => onChange({ ...filters, [key]: value });
  const toggle = (key, value) => setFilter(key, filters[key] === value ? null : value);

  return (
    <div className="pt-filters">
      <TextField
        label="Buscar por nombre o ciudad"
        leadingIcon="search"
        value={filters.query}
        onChange={(e) => setFilter('query', e.target.value)}
        className="pt-filters__search"
      />

      <div className="pt-filters__group" role="group" aria-label="Tipo de propiedad">
        <span className="label-medium text-on-surface-variant">Tipo</span>
        <div className="pt-filters__chips">
          {Object.entries(PROPERTY_TYPES).map(([key, type]) => (
            <Chip
              key={key}
              variant="filter"
              icon={type.icon}
              selected={filters.type === key}
              onClick={() => toggle('type', key)}
            >
              {type.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="pt-filters__group" role="group" aria-label="Estado">
        <span className="label-medium text-on-surface-variant">Estado</span>
        <div className="pt-filters__chips">
          {Object.entries(PROPERTY_STATUS).map(([key, status]) => (
            <Chip
              key={key}
              variant="filter"
              selected={filters.status === key}
              onClick={() => toggle('status', key)}
            >
              {status.label}
            </Chip>
          ))}
        </div>
      </div>

      <p className="pt-filters__count body-medium text-on-surface-variant" aria-live="polite">
        {resultCount === 1 ? '1 propiedad' : `${resultCount} propiedades`}
      </p>
    </div>
  );
}
