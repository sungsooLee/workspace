import { createFileRoute } from '@tanstack/react-router';
import styles from './components/button.module.scss';

export const Route = createFileRoute('/_guide/guide/components/button')({
  component: buttonComponent,
});

function buttonComponent() {
  return (
    <div>
      <button type="">작성완료</button>
    </div>
  );
}

export default buttonComponent;
