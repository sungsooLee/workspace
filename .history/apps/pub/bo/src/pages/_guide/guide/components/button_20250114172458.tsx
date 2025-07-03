import { createFileRoute } from '@tanstack/react-router';
import styles from './Button.module.css';

export const Route = createFileRoute('/_guide/guide/components/Button')({
  component: Button,
});

function Button({ label, onClick = () => {}, styleClass = '' }) {
  return (
    <button className={`nlp_button ${styleClass}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
