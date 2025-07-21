// info-icon.tsx
import { IcoHeart, IcoStar, IcoEye } from '@learnway/icons';

export const infoIcons = {
  star: <IcoStar width={16} height={16} stroke="#0056ff" fill="#0056ff" />,
  heart: <IcoHeart width={16} height={16} stroke="#f58b75" fill="#f58b75" />,
  eye: <IcoEye width={16} height={16} stroke="#0056ff" />,
} as const;
