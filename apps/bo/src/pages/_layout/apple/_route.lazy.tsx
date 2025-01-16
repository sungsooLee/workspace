import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/apple/_route')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/apple/router"!</div>;
}

<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="38" r="2.5" transform="rotate(-90 24 38)" fill="#131C30" />
  <circle cx="24" cy="24" r="2.5" transform="rotate(-90 24 24)" fill="#131C30" />
  <circle cx="24" cy="10" r="2.5" transform="rotate(-90 24 10)" fill="#131C30" />
</svg>;
