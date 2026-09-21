import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/content';
import Logo from './Logo';
import Icon from '../ui/Icon';
import './Footer.css';

const LEGAL_LINKS = [
  { label: 'Términos y condiciones', to: '#' },
  { label: 'Política de privacidad', to: '#' },
  { label: 'Aviso de riesgos', to: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pt-footer">
      <div className="pt-container pt-footer__inner">
        <div className="pt-footer__brand">
          <Logo />
          <p className="body-medium text-on-surface-variant">
            Inversión inmobiliaria fraccionada. Compra tokens de propiedades reales y recibe
            dividendos proporcionales a tu participación.
          </p>
        </div>

        <div className="pt-footer__column">
          <h3 className="title-small">Navegación</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="pt-footer__link body-medium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-footer__column">
          <h3 className="title-small">Legal</h3>
          <ul>
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.to} className="pt-footer__link body-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-footer__column">
          <h3 className="title-small">Contacto</h3>
          <ul>
            <li className="pt-footer__contact body-medium">
              <Icon name="mail" size={18} /> hola@propertytokenize.com
            </li>
            <li className="pt-footer__contact body-medium">
              <Icon name="call" size={18} /> +507 300 1234
            </li>
            <li className="pt-footer__contact body-medium">
              <Icon name="location_on" size={18} /> Ciudad de Panamá
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-container pt-footer__bottom">
        <p className="body-small text-on-surface-variant">
          © {year} Property Tokenize. Todos los derechos reservados.
        </p>
        <p className="body-small text-on-surface-variant pt-footer__disclaimer">
          Los rendimientos proyectados son estimaciones y no garantizan resultados futuros. Toda
          inversión implica riesgo.
        </p>
      </div>
    </footer>
  );
}
