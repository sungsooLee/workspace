import { memo } from 'react';

interface EmbedWidgetPreviewComponentProps {
  componentId: string;
  width: string;
  height: string;
  isMobile?: boolean;
}

const EmbedWidgetPreviewComponent = ({
  componentId,
  width,
  height,
  isMobile = false,
}: EmbedWidgetPreviewComponentProps) => {
  return (
    <iframe
      src={`${import.meta.env.VITE_FO_DOMAIN}/widget/${componentId}?isMobile=${isMobile}`}
      width={width}
      height={height}
    ></iframe>
  );
};

export const EmbedWidgetPreview = memo(EmbedWidgetPreviewComponent);
