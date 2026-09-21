import { useState } from 'react';
import Section from '../components/layout/Section';
import Card, { CardContent } from '../components/ui/Card';
import TextField from '../components/ui/TextField';
import Button from '../components/ui/Button';
import Chip from '../components/ui/Chip';
import Icon from '../components/ui/Icon';
import { CONTACT_INFO } from '../data/content';
import usePageTitle from '../hooks/usePageTitle';
import './ContactPage.css';

const INTERESTS = [
  { key: 'invest', label: 'Quiero invertir', icon: 'trending_up' },
  { key: 'owner', label: 'Tengo una propiedad', icon: 'domain_add' },
  { key: 'other', label: 'Otra consulta', icon: 'help' },
];

const EMPTY_FORM = { name: '', email: '', interest: 'invest', message: '' };

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Ingresa tu nombre';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Ingresa un correo válido';
  if (form.message.trim().length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres)';
  return errors;
};

export default function ContactPage() {
  usePageTitle('Contacto');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // Sitio informativo: no hay backend; se simula el envío.
      setSent(true);
    }
  };

  return (
    <>
      <header className="pt-page-header">
        <div className="pt-container">
          <h1 className="pt-page-header__title headline-large">Contacto</h1>
          <p className="pt-page-header__subtitle body-large">
            ¿Quieres invertir, registrar una propiedad o simplemente saber más? Escríbenos.
          </p>
        </div>
      </header>

      <Section>
        <div className="pt-contact">
          <Card variant="outlined" className="pt-contact__form-card">
            <CardContent>
              {sent ? (
                <div className="pt-contact__success" role="status">
                  <Icon name="mark_email_read" size={56} className="text-primary" />
                  <h2 className="headline-small">¡Mensaje recibido!</h2>
                  <p className="body-large text-on-surface-variant">
                    Gracias, {form.name.split(' ')[0]}. Un asesor te contactará en las próximas 24
                    horas hábiles.
                  </p>
                  <Button
                    variant="tonal"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setSent(false);
                    }}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form className="pt-contact__form" onSubmit={handleSubmit} noValidate>
                  <h2 className="title-large">Envíanos un mensaje</h2>

                  <div className="pt-contact__interest" role="group" aria-label="Motivo de contacto">
                    {INTERESTS.map((item) => (
                      <Chip
                        key={item.key}
                        variant="filter"
                        icon={item.icon}
                        selected={form.interest === item.key}
                        onClick={() => setForm((f) => ({ ...f, interest: item.key }))}
                      >
                        {item.label}
                      </Chip>
                    ))}
                  </div>

                  <TextField
                    label="Nombre completo"
                    leadingIcon="person"
                    value={form.name}
                    onChange={update('name')}
                    error={errors.name}
                    required
                    autoComplete="name"
                  />
                  <TextField
                    label="Correo electrónico"
                    type="email"
                    leadingIcon="mail"
                    value={form.email}
                    onChange={update('email')}
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                  <TextField
                    label="Mensaje"
                    multiline
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    error={errors.message}
                    supportingText="Cuéntanos en qué propiedad estás interesado o describe tu inmueble."
                    required
                  />

                  <Button type="submit" variant="filled" icon="send">
                    Enviar mensaje
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <aside className="pt-contact__info">
            <ul className="pt-contact__list">
              {CONTACT_INFO.map((item) => (
                <li key={item.label} className="pt-contact__item">
                  <span className="pt-contact__item-icon">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <p className="label-medium text-on-surface-variant">{item.label}</p>
                    <p className="body-large">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-contact__note">
              <Icon name="info" size={20} className="text-primary" />
              <p className="body-medium text-on-surface-variant">
                Este formulario es informativo. Por ahora no almacenamos datos: un asesor te
                escribirá directamente al correo indicado.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
