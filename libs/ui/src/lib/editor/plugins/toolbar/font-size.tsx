import Button from '../../components/ui/button';
const fontSize = () => {
  return (
    <>
      <Button icon={'plus'} className={'!p-0'} />
      <input
        type={'number'}
        className={`no-spinner font-bold text-[14px] text-gray-500 rounded border
          border-gray-400 h-[23px] px-1 py-0.5 text-center w-[32px] self-center disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-gray-100`}
      />
      <Button icon={'minus'} className={'!p-0'} />
    </>
  );
};
export default fontSize;
