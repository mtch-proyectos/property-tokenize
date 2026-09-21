import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../data/content';
import Icon from '../ui/Icon';
import './NavigationBar.css';

/**
 * Navigation Bar MD3 (barra inferior) — visible solo en pantallas compactas.
 */
export default function NavigationBar() {
  return (
    <nav className="pt-navbar" aria-label="Navegación móvil">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => `pt-navbar__item ${isActive ? 'pt-navbar__item--active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="pt-navbar__indicator">
                <Icon name={link.icon} filled={isActive} />
              </span>
              <span className="pt-navbar__label label-medium">{link.shortLabel ?? link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
