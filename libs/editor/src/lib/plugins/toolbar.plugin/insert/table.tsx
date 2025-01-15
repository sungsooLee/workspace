import { FC, useState } from 'react';

const Table: FC<{ onInsert: (rows: string, columns: string) => void }> = ({ onInsert }) => {
  const [rows, setRows] = useState('3');
  const [col, setcol] = useState('5');
  const handleClickInsert = () => {
    onInsert(rows, col);
  };
  return (
    <div className={'flex flex-col gap-4'}>
      <div className="flex flex-col gap-4">
        <div className={'flex items-center justify-between gap-4'}>
          <label htmlFor="file" className={'font-bold'}>
            가로
          </label>
          <input
            className={
              'border-gray-3 focus:border-gray-5 w-full flex-1 rounded-lg border p-2 focus:outline-none'
            }
            id={'text'}
            type="text"
            onChange={(e: any) => setRows(e.target.value)}
            value={rows}
          />
        </div>
        <div className={'flex items-center justify-between gap-4'}>
          <label htmlFor="url_desc" className={'font-bold'}>
            설명
          </label>
          <input
            id={'url_desc'}
            className={
              'border-gray-3 focus:border-gray-5 w-full flex-1 rounded-lg border p-2 focus:outline-none'
            }
            type="text"
            value={col}
            onChange={(e: any) => setcol(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button className={'bg-gray-3 hover:bg-gray-5 rounded-lg p-2'} onClick={handleClickInsert}>
          입력
        </button>
      </div>
    </div>
  );
};

export default Table;
