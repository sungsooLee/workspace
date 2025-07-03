import { IcoBackward } from '@learnway/icons';
import { Link } from '@tanstack/react-router';

const LessonTitle = ({ lessonTitle }: { lessonTitle: string }) => {
  const goBack = () => {
    console.log();
  };
  return (
    <div className="absolute left-10 top-6 flex items-center gap-2">
      <Link to={'/'}>
        <IcoBackward className="h-10 w-10 cursor-pointer" onClick={goBack} />
      </Link>
      <div className="text-[26px] font-semibold text-white">{lessonTitle}</div>
    </div>
  );
};

export default LessonTitle;
