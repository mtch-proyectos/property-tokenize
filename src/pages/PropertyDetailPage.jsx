import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Section from '../components/layout/Section';
import TokenCalculator from '../components/property/TokenCalculator';
import TokenProgress from '../components/property/TokenProgress';
import PropertyGrid from '../components/property/PropertyGrid';
import Chip from '../components/ui/Chip';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import { getPropertyById, properties, PROPERTY_STATUS, PROPERTY_TYPES } from '../data/properties';
import { getAnnualDividendPool, getTokenPrice } from '../utils/tokens';
import { formatCurrency, formatNumber, formatPercent } from '../utils/format';
import usePageTitle from '../hooks/usePageTitle';
import './PropertyDetailPage.css';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = getPropertyById(id);
  usePageTitle(property?.name);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return <Navigate to="/propiedades" replace />;

  const type = PROPERTY_TYPES[property.type];
  const status = PROPERTY_STATUS[property.status];
  const tokenPrice = getTokenPrice(property);
  const dividendPool = getAnnualDividendPool(property);
  const related = properties.filter((p) => p.id !== property.id && p.status !== 'funded').slice(0, 3);

  const facts = [
    { icon: 'square_foot', label: 'Superficie', value: `${formatNumber(property.area)} m²` },
    { icon: 'layers', label: 'Pisos', value: formatNumber(property.floors) },
    { icon: 'calendar_month', label: 'Año', value: property.yearBuilt },
    { icon: 'meeting_room', label: 'Ocupación', value: formatPercent(property.occupancy, 0) },
    { icon: 'group', label: 'Inversores', value: formatNumber(property.investors) },
    { icon: 'location_on', label: 'Dirección', value: property.address },
  ];

  return (
    <article className="pt-detail">
      <div className="pt-container">
        <nav className="pt-detail__breadcrumb body-medium" aria-label="Migas de pan">
          <Link to="/propiedades">Propiedades</Link>
          <Icon name="chevron_right" size={18} />
          <span aria-current="page">{property.name}</span>
        </nav>

        <header className="pt-detail__header">
          <div className="pt-detail__chips">
            <Chip tone={status.color}>{status.label}</Chip>
            <Chip icon={type.icon} tone="outline">
              {type.label}
            </Chip>
          </div>
          <h1 className="pt-detail__title headline-large">{property.name}</h1>
          <p className="pt-detail__location body-large">
            <Icon name="location_on" size={20} /> {property.address}, {property.city}, {property.country}
          </p>
        </header>

        <div className="pt-detail__gallery">
          <div className="pt-detail__gallery-main">
            <img src={property.gallery[activeImage]} alt={`${property.name}, imagen ${activeImage + 1}`} />
          </div>
          <div className="pt-detail__gallery-thumbs" role="tablist" aria-label="Galería">
            {property.gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={i === activeImage}
                className={`pt-detail__thumb ${i === activeImage ? 'pt-detail__thumb--active' : ''}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-detail__layout">
          <div className="pt-detail__main">
            <section className="pt-detail__block">
              <h2 className="title-large">Resumen</h2>
              <p className="body-large text-on-surface-variant">{property.summary}</p>
              <ul className="pt-detail__facts">
                {facts.map((fact) => (
                  <li key={fact.label}>
                    <Icon name={fact.icon} size={20} />
                    <div>
                      <span className="label-small text-on-surface-variant">{fact.label}</span>
                      <span className="body-medium">{fact.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-detail__block">
              <h2 className="title-large">Estructura de tokens</h2>
              <dl className="pt-detail__tokens">
                <div>
                  <dt className="label-medium">Valor de la propiedad</dt>
                  <dd className="title-large">{formatCurrency(property.valuation)}</dd>
                </div>
                <div>
                  <dt className="label-medium">Tokens emitidos</dt>
                  <dd className="title-large">{formatNumber(property.totalTokens)}</dd>
                </div>
                <div>
                  <dt className="label-medium">Precio por token</dt>
                  <dd className="title-large">{formatCurrency(tokenPrice, { precise: true })}</dd>
                </div>
                <div>
                  <dt className="label-medium">Dividendo anual estimado</dt>
                  <dd className="title-large text-primary">{formatCurrency(dividendPool)}</dd>
                </div>
              </dl>
              <TokenProgress property={property} />
              <p className="body-medium text-on-surface-variant">
                Cada token equivale a{' '}
                <strong>{formatPercent(100 / property.totalTokens, 3)}</strong> de la propiedad. El
                dividendo se reparte entre los tenedores en esa misma proporción.
              </p>
            </section>

            <section className="pt-detail__block">
              <h2 className="title-large">Por qué invertir</h2>
              <ul className="pt-detail__highlights">
                {property.highlights.map((h) => (
                  <li key={h} className="body-large">
                    <Icon name="check_circle" filled className="text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-detail__block">
              <h2 className="title-large">Distribución de dividendos</h2>
              <p className="body-large text-on-surface-variant">{property.useOfFunds}</p>
            </section>

            <section className="pt-detail__block">
              <h2 className="title-large">Documentación</h2>
              <ul className="pt-detail__docs">
                {property.documents.map((doc) => (
                  <li key={doc}>
                    <Icon name="description" className="text-primary" />
                    <span className="body-medium">{doc}</span>
                    <Button variant="text" icon="lock" to="/contacto">
                      Solicitar
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="pt-detail__aside">
            <TokenCalculator property={property} />
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <Section tone="low" eyebrow="Sigue explorando" title="Otras oportunidades">
          <PropertyGrid properties={related} />
        </Section>
      )}
    </article>
  );
}
