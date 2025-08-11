import { useUpdateFavorite } from '@entities/course';
import { IcoStar } from '@learnway/icons';
import { FC, useState } from 'react';
import { Button } from '@learnway/ui/button';

interface CourseFavoriteIconProps {
  courseId: number;
  isFavorite: boolean;
  onSuccess?: () => void;
}

const Component: FC<CourseFavoriteIconProps> = ({
  courseId,
  isFavorite: initFavorite,
  onSuccess,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initFavorite);
  const { mutate: updateFavorite } = useUpdateFavorite({
    onSuccess: () => {
      console.log('aaa');
      setIsFavorite((prev) => !prev);
      onSuccess?.();
    },
  });

  const handleClick = () => {
    console.log('courseId', courseId);
    updateFavorite({ id: courseId });
  };

  return (
    <Button
      size="sm"
      icon={
        <IcoStar
          width={16}
          height={16}
          stroke={isFavorite ? '#FFB902' : '#A9AFB8'}
          fill={isFavorite ? '#FFB902' : 'none'}
        />
      }
      onClick={() => handleClick()}
    />
  );
};

export const CourseFavoriteIcon = Component;
