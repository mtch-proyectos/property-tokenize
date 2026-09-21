import Button from '../ui/Button';
import Icon from '../ui/Icon';
import './Hero.css';

/**
 * Hero de la portada: propuesta de valor + ilustración del modelo de tokens.
 */
export default function Hero() {
  // 1000 tokens de los cuales 250 pertenecen al inversor del ejemplo.
  const EXAMPLE_TOTAL = 1000;
  const EXAMPLE_OWNED = 250;
  const CELLS = 40; // 40 celdas → cada celda = 25 tokens
  const ownedCells = Math.round((EXAMPLE_OWNED / EXAMPLE_TOTAL) * CELLS);

  return (
    <section className="pt-hero">
      <div className="pt-container pt-hero__inner">
        <div className="pt-hero__copy">
          <p className="pt-hero__eyebrow label-large">
            <Icon name="token" size={18} /> Inversión inmobiliaria fraccionada
          </p>
          <h1 className="pt-hero__title display-small">
            Sé dueño de una parte de propiedades reales, <span>desde un solo token</span>.
          </h1>
          <p className="pt-hero__lead body-large">
            Cada inmueble se divide en tokens. Compra los que quieras, conviértete en copropietario y
            recibe los dividendos que genera la propiedad en proporción a tu participación.
          </p>
          <div className="pt-hero__actions">
            <Button to="/propiedades" variant="filled" icon="explore">
              Explorar propiedades
            </Button>
            <Button to="/como-funciona" variant="outlined" icon="play_circle">
              Cómo funciona
            </Button>
          </div>
          <ul className="pt-hero__trust">
            <li className="body-small">
              <Icon name="verified" size={18} /> Avalúo independiente
            </li>
            <li className="body-small">
              <Icon name="lock" size={18} /> Contratos auditados
            </li>
            <li className="body-small">
              <Icon name="payments" size={18} /> Dividendos periódicos
            </li>
          </ul>
        </div>

        <div className="pt-hero__visual" aria-hidden="true">
          <div className="pt-hero__card">
            <div className="pt-hero__card-head">
              <span className="label-medium">Edificio · 1.000 tokens</span>
              <span className="pt-hero__pill label-small">Coworking</span>
            </div>
            <div className="pt-hero__grid">
              {Array.from({ length: CELLS }).map((_, i) => (
                <span key={i} className={`pt-hero__cell ${i < ownedCells ? 'pt-hero__cell--owned' : ''}`} />
              ))}
            </div>
            <div className="pt-hero__card-foot">
              <div>
                <p className="label-small">Tus tokens</p>
                <p className="title-large">250</p>
              </div>
              <div>
                <p className="label-small">Participación</p>
                <p className="title-large">25%</p>
              </div>
              <div>
                <p className="label-small">Del dividendo</p>
                <p className="title-large">25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
