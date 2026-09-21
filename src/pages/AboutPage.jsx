import Section from '../components/layout/Section';
import FeatureCard from '../components/home/FeatureCard';
import StatsBand from '../components/home/StatsBand';
import CtaBanner from '../components/home/CtaBanner';
import Card, { CardContent } from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import { TEAM, VALUES } from '../data/content';
import usePageTitle from '../hooks/usePageTitle';
import './AboutPage.css';

export default function AboutPage() {
  usePageTitle('Nosotros');

  return (
    <>
      <header className="pt-page-header">
        <div className="pt-container">
          <h1 className="pt-page-header__title headline-large">Nosotros</h1>
          <p className="pt-page-header__subtitle body-large">
            Nacimos para que invertir en bienes raíces deje de ser exclusivo de quienes pueden
            comprar un inmueble completo.
          </p>
        </div>
      </header>

      <Section>
        <div className="pt-about__mission">
          <div className="pt-about__mission-text">
            <p className="pt-section__eyebrow label-large">Nuestra misión</p>
            <h2 className="headline-medium">Democratizar la propiedad inmobiliaria</h2>
            <p className="body-large text-on-surface-variant">
              Property Tokenize conecta a propietarios que quieren financiar o monetizar sus
              inmuebles con inversores que buscan ingresos pasivos respaldados por activos reales.
              Dividimos cada propiedad en tokens, publicamos toda su información y distribuimos los
              dividendos de forma transparente y proporcional.
            </p>
            <p className="body-large text-on-surface-variant">
              Cada propiedad pasa por un proceso de auditoría legal, avalúo independiente y revisión
              de contratos antes de abrir su financiamiento.
            </p>
          </div>
          <div className="pt-about__mission-visual" aria-hidden="true">
            <Icon name="apartment" size={120} />
          </div>
        </div>
      </Section>

      <StatsBand />

      <Section eyebrow="Valores" title="Lo que nos guía">
        <div className="pt-feature-grid pt-feature-grid--3">
          {VALUES.map((value) => (
            <FeatureCard key={value.title} variant="outlined" {...value} />
          ))}
        </div>
      </Section>

      <Section tone="low" eyebrow="Equipo" title="Las personas detrás de la plataforma">
        <ul className="pt-team">
          {TEAM.map((member) => (
            <li key={member.name}>
              <Card variant="elevated" className="pt-team__card">
                <CardContent>
                  <div className="pt-team__avatar">
                    <Icon name={member.icon} size={40} />
                  </div>
                  <h3 className="title-medium">{member.name}</h3>
                  <p className="body-medium text-on-surface-variant">{member.role}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title="¿Tienes una propiedad para tokenizar?"
        description="Si eres propietario y quieres financiar tu inmueble con cientos de inversores, cuéntanos sobre tu proyecto."
        primaryLabel="Registrar mi propiedad"
        primaryTo="/contacto"
        secondaryLabel="Ver propiedades"
        secondaryTo="/propiedades"
      />
    </>
  );
}
