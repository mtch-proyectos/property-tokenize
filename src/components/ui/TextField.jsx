import { useId } from 'react';
import Icon from './Icon';
import './TextField.css';

/**
 * TextField MD3 (variante outlined) con label flotante.
 * Soporta input o textarea (prop `multiline`), ícono inicial, prefijo/sufijo,
 * texto de apoyo y estado de error.
 */
export default function TextField({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 4,
  leadingIcon,
  prefix,
  suffix,
  supportingText,
  error,
  required = false,
  className = '',
  ...rest
}) {
  const id = useId();
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const Field = multiline ? 'textarea' : 'input';

  const classes = [
    'md-textfield',
    hasValue ? 'md-textfield--populated' : '',
    error ? 'md-textfield--error' : '',
    leadingIcon ? 'md-textfield--with-icon' : '',
    multiline ? 'md-textfield--multiline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="md-textfield__container">
        {leadingIcon && <Icon name={leadingIcon} className="md-textfield__leading" />}
        {prefix && <span className="md-textfield__affix">{prefix}</span>}
        <Field
          id={id}
          className="md-textfield__input"
          value={value}
          onChange={onChange}
          type={multiline ? undefined : type}
          rows={multiline ? rows : undefined}
          placeholder=" "
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={supportingText || error ? `${id}-support` : undefined}
          {...rest}
        />
        {suffix && <span className="md-textfield__affix">{suffix}</span>}
        <label htmlFor={id} className="md-textfield__label">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        <fieldset className="md-textfield__outline" aria-hidden="true">
          <legend className="md-textfield__legend">
            <span>
              {label}
              {required && ' *'}
            </span>
          </legend>
        </fieldset>
      </div>
      {(supportingText || error) && (
        <p id={`${id}-support`} className="md-textfield__support">
          {error || supportingText}
        </p>
      )}
    </div>
  );
}
