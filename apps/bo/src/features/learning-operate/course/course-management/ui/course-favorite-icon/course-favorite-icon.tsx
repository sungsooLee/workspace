import { useUpdateFavorite } from '@entities/course';
import { IcoStar } from '@learnway/icons';
import { FC, useState } from 'react';

interface CourseFavoriteIconProps {
  courseId: number;
  isFavorite: boolean;
}

const Component: FC<CourseFavoriteIconProps> = ({ courseId, isFavorite: initFavorite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initFavorite);
  const { mutate: updateFavorite } = useUpdateFavorite({
    onSuccess: () => {
      console.log('aaa');
      setIsFavorite(!isFavorite);
    },
  });

  const handleClick = () => {
    console.log('courseId', courseId);
    updateFavorite({ id: courseId });
  };

  return isFavorite ? (
    <IcoStar width={16} height={16} stroke="#FFB902" fill="#FFB902" onClick={() => handleClick()} />
  ) : (
    <IcoStar width={16} height={16} stroke="#A9AFB8" fill="none" onClick={() => handleClick()} />
  );
};

export const CourseFavoriteIcon = Component;
