import { createFileRoute } from '@tanstack/react-router';
import styles from './Button.module.css';

export const Route = createFileRoute('/_guide/guide/components/Button')({
  component: Button,
});

function Button() {
  return (
    <div>
      <button className={styles.nlp_button}>작성완료</button>
    </div>
  );
}

export default Button;
