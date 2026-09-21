import Section from '../components/layout/Section';
import FeatureCard from '../components/home/FeatureCard';
import FaqList from '../components/home/FaqList';
import CtaBanner from '../components/home/CtaBanner';
import TokenCalculator from '../components/property/TokenCalculator';
import Icon from '../components/ui/Icon';
import { FAQS, HOW_IT_WORKS_STEPS } from '../data/content';
import { properties } from '../data/properties';
import usePageTitle from '../hooks/usePageTitle';
import './HowItWorksPage.css';

/**
 * Ejemplo didáctico: edificio de 1.000 tokens, el inversor compra 250.
 */
const EXAMPLE = {
  valuation: 1000000,
  totalTokens: 1000,
  tokensBought: 250,
  annualIncome: 80000,
};

export default function HowItWorksPage() {
  usePageTitle('Cómo funciona');
  const exampleProperty = properties.find((p) => p.type === 'coworking') ?? properties[0];
  const ownership = (EXAMPLE.tokensBought / EXAMPLE.totalTokens) * 100;
  const dividend = EXAMPLE.annualIncome * (ownership / 100);

  return (
    <>
      <header className="pt-page-header">
        <div className="pt-container">
          <h1 className="pt-page-header__title headline-large">Cómo funciona Property Tokenize</h1>
          <p className="pt-page-header__subtitle body-large">
            Convertimos propiedades reales en tokens para que puedas invertir en la fracción que
            quieras y recibir dividendos proporcionales.
          </p>
        </div>
      </header>

      <Section>
        <div className="pt-feature-grid">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <FeatureCard key={step.title} step={i + 1} {...step} />
          ))}
        </div>
      </Section>

      <Section
        tone="low"
        eyebrow="Ejemplo práctico"
        title="Un edificio, 1.000 tokens, tu decisión"
        description="Sigamos el caso de un inversor que compra 250 tokens de un edificio destinado a coworking."
      >
        <ol className="pt-example">
          <li className="pt-example__step">
            <div className="pt-example__icon">
              <Icon name="domain" size={28} />
            </div>
            <div className="pt-example__body">
              <h3 className="title-medium">1. El propietario registra el edificio</h3>
              <p className="body-medium text-on-surface-variant">
                Un edificio valorado en <strong>$1.000.000</strong> se inscribe en la plataforma
                dividido en <strong>1.000 tokens</strong>. Cada token vale <strong>$1.000</strong> y
                representa el <strong>0,1%</strong> de la propiedad.
              </p>
            </div>
          </li>
          <li className="pt-example__step">
            <div className="pt-example__icon">
              <Icon name="visibility" size={28} />
            </div>
            <div className="pt-example__body">
              <h3 className="title-medium">2. El inversor analiza la oportunidad</h3>
              <p className="body-medium text-on-surface-variant">
                En el detalle ve que el edificio se destinará a alquilar espacios de coworking, con
                una ocupación proyectada alta y un ingreso neto anual estimado de{' '}
                <strong>$80.000</strong>.
              </p>
            </div>
          </li>
          <li className="pt-example__step">
            <div className="pt-example__icon">
              <Icon name="shopping_cart" size={28} />
            </div>
            <div className="pt-example__body">
              <h3 className="title-medium">3. Compra 250 tokens</h3>
              <p className="body-medium text-on-surface-variant">
                Invierte <strong>$250.000</strong> y pasa a ser dueño del{' '}
                <strong>{ownership}%</strong> del edificio (250 de 1.000 tokens).
              </p>
            </div>
          </li>
          <li className="pt-example__step">
            <div className="pt-example__icon">
              <Icon name="payments" size={28} />
            </div>
            <div className="pt-example__body">
              <h3 className="title-medium">4. Recibe el 25% del dividendo</h3>
              <p className="body-medium text-on-surface-variant">
                De los $80.000 anuales que genera el coworking, le corresponden{' '}
                <strong>${dividend.toLocaleString('es-ES')}</strong> al año, distribuidos en los
                periodos que defina la propiedad. El 75% restante se reparte entre los demás
                tenedores según sus tokens.
              </p>
            </div>
          </li>
        </ol>

        <div className="pt-example__formula">
          <Icon name="functions" className="text-primary" />
          <p className="body-large">
            <strong>Participación</strong> = tokens comprados ÷ tokens totales &nbsp;·&nbsp;{' '}
            <strong>Dividendo</strong> = participación × ingreso neto de la propiedad
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Pruébalo"
        title="Simula con una propiedad real"
        description={`Usa el simulador con ${exampleProperty.name} para ver cómo cambia tu participación y tu dividendo según los tokens que elijas.`}
      >
        <div className="pt-example__calculator">
          <TokenCalculator property={exampleProperty} initialTokens={250} />
        </div>
      </Section>

      <Section tone="low" eyebrow="Preguntas frecuentes" title="Todo lo que necesitas saber" align="center">
        <FaqList items={FAQS} />
      </Section>

      <CtaBanner />
    </>
  );
}
