import { useRouter, createFileRoute } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">로그인 페이지</div>
  );
}
