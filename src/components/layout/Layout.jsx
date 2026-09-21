import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import './Layout.css';

const THEME_KEY = 'pt-theme';

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* almacenamiento no disponible */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Layout raíz: app bar + contenido enrutado + footer + barra móvil.
 * Gestiona el tema claro/oscuro y el scroll al cambiar de ruta.
 */
export default function Layout() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignorar */
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="pt-layout">
      <TopAppBar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main className="pt-layout__main">
        <Outlet />
      </main>
      <Footer />
      <NavigationBar />
    </div>
  );
}
