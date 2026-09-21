import { useEffect } from 'react';

const BRAND = 'Property Tokenize';

/** Actualiza el <title> del documento para la página actual. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND}` : `${BRAND} · Inversión inmobiliaria fraccionada`;
  }, [title]);
}
