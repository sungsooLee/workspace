import { createFileRoute } from '@tanstack/react-router';
import { buttonComponent } from './components/button';

export const Route = createFileRoute('/_guide/guide/button')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Button Info</h2>
    </div>
  );
}
