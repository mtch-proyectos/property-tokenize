import { Link } from 'react-router-dom';
import './Logo.css';

/** Logotipo de la marca. Enlaza al inicio. */
export default function Logo({ compact = false, className = '' }) {
  return (
    <Link to="/" className={`pt-logo ${compact ? 'pt-logo--compact' : ''} ${className}`.trim()} aria-label="Property Tokenize, inicio">
      <svg className="pt-logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="currentColor" opacity="0.15" />
        <path d="M18 46V26l14-10 14 10v20H36v-12h-8v12z" fill="currentColor" />
      </svg>
      {!compact && (
        <span className="pt-logo__text">
          Property<strong>Tokenize</strong>
        </span>
      )}
    </Link>
  );
}
