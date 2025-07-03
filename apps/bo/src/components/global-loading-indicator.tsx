import { useIsMutating } from '@tanstack/react-query';
import { Spinner } from '@learnway/ui';

interface GlobalLoadingIndicatorProps {
  children: React.ReactNode;
}

export function GlobalLoadingIndicator({ children }: GlobalLoadingIndicatorProps) {
  const isMutating = useIsMutating();

  const isLoading = isMutating > 0;

  return (
    <>
      {children}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Spinner isLoading={isLoading} />
        </div>
      )}
    </>
  );
}
