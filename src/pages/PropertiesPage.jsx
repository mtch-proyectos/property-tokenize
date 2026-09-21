import { useMemo, useState } from 'react';
import Section from '../components/layout/Section';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyGrid from '../components/property/PropertyGrid';
import { properties } from '../data/properties';
import usePageTitle from '../hooks/usePageTitle';

const INITIAL_FILTERS = { query: '', type: null, status: null };

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function PropertiesPage() {
  usePageTitle('Propiedades');
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filtered = useMemo(() => {
    const q = normalize(filters.query.trim());
    return properties.filter((p) => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (q) {
        const haystack = normalize(`${p.name} ${p.city} ${p.country}`);
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <>
      <header className="pt-page-header">
        <div className="pt-container">
          <h1 className="pt-page-header__title headline-large">Propiedades tokenizadas</h1>
          <p className="pt-page-header__subtitle body-large">
            Explora los inmuebles disponibles, revisa su rendimiento proyectado y elige cuántos
            tokens quieres adquirir.
          </p>
        </div>
      </header>

      <Section className="pt-properties-section">
        <PropertyFilters filters={filters} onChange={setFilters} resultCount={filtered.length} />
        <PropertyGrid properties={filtered} />
      </Section>
    </>
  );
}
