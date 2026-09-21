import Icon from '../ui/Icon';
import './FaqList.css';

/** Lista de preguntas frecuentes con acordeón nativo (<details>). */
export default function FaqList({ items }) {
  return (
    <div className="pt-faq">
      {items.map((item, index) => (
        <details key={item.question} className="pt-faq__item" open={index === 0}>
          <summary className="pt-faq__question title-medium">
            <span>{item.question}</span>
            <Icon name="expand_more" className="pt-faq__chevron" />
          </summary>
          <p className="pt-faq__answer body-medium">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
