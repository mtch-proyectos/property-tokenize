import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Página no encontrada');
  return (
    <Section>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: '48px 0' }}>
        <Icon name="explore_off" size={64} className="text-primary" />
        <h1 className="headline-medium">Página no encontrada</h1>
        <p className="body-large text-on-surface-variant">
          La página que buscas no existe o fue movida.
        </p>
        <Button to="/" variant="filled" icon="home">
          Volver al inicio
        </Button>
      </div>
    </Section>
  );
}
