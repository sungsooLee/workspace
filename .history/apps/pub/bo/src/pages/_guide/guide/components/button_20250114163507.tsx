import { createFileRoute } from '@tanstack/react-router';
import styles from './button.module.css';

export const Route = createFileRoute('/_guide/guide/components/button')({
  component: button,
});

function button() {
  return (
    <div>
      <button type="" className={styles.btn}>
        작성완료
      </button>
    </div>
  );
}

export default buttonComponent;
