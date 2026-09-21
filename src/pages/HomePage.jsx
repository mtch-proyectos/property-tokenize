import Hero from '../components/home/Hero';
import StatsBand from '../components/home/StatsBand';
import FeatureCard from '../components/home/FeatureCard';
import CtaBanner from '../components/home/CtaBanner';
import FaqList from '../components/home/FaqList';
import Section from '../components/layout/Section';
import PropertyGrid from '../components/property/PropertyGrid';
import Button from '../components/ui/Button';
import { getFeaturedProperties } from '../data/properties';
import { BENEFITS, FAQS, HOW_IT_WORKS_STEPS } from '../data/content';
import usePageTitle from '../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle();
  const featured = getFeaturedProperties();

  return (
    <>
      <Hero />
      <StatsBand />

      <Section
        id="como-funciona"
        eyebrow="Cómo funciona"
        title="Del edificio al token, en cuatro pasos"
        description="Un propietario registra su inmueble con un número fijo de tokens. Tú compras los que quieras y recibes dividendos según tu porcentaje."
      >
        <div className="pt-feature-grid">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <FeatureCard key={step.title} step={i + 1} {...step} />
          ))}
        </div>
      </Section>

      <Section
        tone="low"
        eyebrow="Oportunidades"
        title="Propiedades destacadas"
        description="Inmuebles verificados, con documentación completa y rendimiento proyectado."
      >
        <PropertyGrid properties={featured} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <Button to="/propiedades" variant="tonal" trailingIcon="arrow_forward">
            Ver todas las propiedades
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Beneficios"
        title="Invertir en bienes raíces, sin comprar el edificio entero"
      >
        <div className="pt-feature-grid">
          {BENEFITS.map((benefit) => (
            <FeatureCard key={benefit.title} variant="outlined" {...benefit} />
          ))}
        </div>
      </Section>

      <Section tone="low" eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" align="center">
        <FaqList items={FAQS} />
      </Section>

      <CtaBanner />
    </>
  );
}
