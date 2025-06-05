const LessonTitle = ({ lessonTitle }: { lessonTitle: string }) => {
  return (
    <div className="absolute left-10 top-6 text-3xl font-semibold text-white">{lessonTitle}</div>
  );
};

export default LessonTitle;
