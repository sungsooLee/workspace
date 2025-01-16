import { createFileRoute } from '@tanstack/react-router';
import styles from './Button.module.css';

export const Route = createFileRoute('/_guide/guide/components/Button')({
  component: Button,
});

function Button({ label, styleClass = '' }) {
  return <button className={`nlp_button ${styleClass}`}>{label}</button>;
}

export default Button;
