export const ErrorJavascript = () => {
  const data = { title: null, content: ' 참조 에러 TEST' };
  let testVar;

  return (
    <>
      <div>
        <h1>{data.title.toUpperCase()}</h1>
        <h1>{testVar.prop}</h1>
        <h2>{data.content}</h2>
      </div>
    </>
  );
};
