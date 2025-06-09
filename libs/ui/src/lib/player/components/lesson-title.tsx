import { IcoBackward } from '@learnway/icons';

const LessonTitle = ({ lessonTitle }: { lessonTitle: string }) => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="absolute left-10 top-6 flex items-center gap-2">
      <IcoBackward className="h-10 w-10 cursor-pointer" onClick={goBack} />
      <div className="text-[26px] font-semibold text-white">{lessonTitle}</div>
    </div>
  );
};

export default LessonTitle;
