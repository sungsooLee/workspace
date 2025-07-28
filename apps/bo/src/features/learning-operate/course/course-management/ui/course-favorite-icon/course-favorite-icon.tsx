import { useUpdateFavorite } from '@entities/course';
import { IcoStar } from '@learnway/icons';
import { FC, useState } from 'react';
import { boolean } from 'zod';

interface CourseFavoriteIconProps {
  courseId: number;
  isFavorite: boolean;
}

const Component: FC<CourseFavoriteIconProps> = ({ courseId, isFavorite: initFavorite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initFavorite);
  const { mutate: updateFavorite } = useUpdateFavorite({
    onSuccess: () => {
      setIsFavorite(!isFavorite);
    },
  });

  const handleClick = (newValue: boolean) => {
    console.log('handleClick', newValue);
    updateFavorite({ id: courseId });
  };

  return isFavorite ? (
    <IcoStar
      width={16}
      height={16}
      stroke="#FFB902"
      fill="#FFB902"
      onClick={() => handleClick(false)}
    />
  ) : (
    <IcoStar
      width={16}
      height={16}
      stroke="#A9AFB8"
      fill="none"
      onClick={() => handleClick(true)}
    />
  );
};

export const CourseFavoriteIcon = Component;
