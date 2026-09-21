import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../data/content';
import Button, { IconButton } from '../ui/Button';
import Logo from './Logo';
import './TopAppBar.css';

/**
 * Top App Bar MD3 (center-aligned en móvil, con navegación en escritorio).
 * Se eleva (cambia de tono) cuando la página hace scroll.
 */
export default function TopAppBar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`pt-appbar ${scrolled ? 'pt-appbar--scrolled' : ''}`}>
      <div className="pt-container pt-appbar__inner">
        <Logo />

        <nav className="pt-appbar__nav" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `pt-appbar__link label-large ${isActive ? 'pt-appbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-appbar__actions">
          <IconButton
            icon={theme === 'dark' ? 'light_mode' : 'dark_mode'}
            label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            onClick={onToggleTheme}
          />
          <Button to="/propiedades" variant="filled" icon="explore" className="pt-appbar__cta">
            Explorar
          </Button>
        </div>
      </div>
    </header>
  );
}
