import { FC, useState } from 'react';

const Video: FC<{ onInsert: (url: string) => void }> = ({ onInsert }) => {
  const [url, setUrl] = useState();
  const handleClickInsert = () => {
    if (url) {
      onInsert(url);
    }
  };
  return (
    <div className={'flex flex-col gap-4'}>
      <div className="flex flex-col gap-4">
        <div className={'flex items-center justify-between gap-4'}>
          <label htmlFor="url" className={'font-bold'}>
            URL
          </label>
          <input
            className={
              'border-gray-3 focus:border-gray-5 w-full flex-1 rounded-lg border p-2 focus:outline-none'
            }
            id={'url'}
            type="text"
            onChange={(e: any) => setUrl(e.target.value)}
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

export default Video;
