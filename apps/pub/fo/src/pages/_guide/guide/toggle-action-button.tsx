import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guide/guide/toggle-action-button')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Action Button Component</h2>
      <p className="loc css">@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css</p>
    </div>
  );
}
