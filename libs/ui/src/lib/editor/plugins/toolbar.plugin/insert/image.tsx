import { useState, MouseEvent, ChangeEvent, FC } from 'react';
import { InsertImagePayload } from '../../images.plugin';
type Step = 'choice' | 'url' | 'file';
const Image: FC<{ onInsert: (payload: InsertImagePayload) => void }> = ({ onInsert }) => {
  const [step, setStep] = useState<Step>('choice');
  const [src, setSrc] = useState('');
  const [altText, setAltText] = useState('');

  const handleChangeStep = (e: MouseEvent<HTMLButtonElement>, pStep: Step) => {
    e.preventDefault();
    e.stopPropagation();
    setStep(pStep);
    setSrc('');
    setAltText('');
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        setSrc(reader.result);
      }
      return '';
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClickInsert = (e: MouseEvent<HTMLButtonElement>) => {
    onInsert({
      src,
      altText,
    });
  };

  return (
    <div className={'w-[300px]'}>
      {step === 'choice' && (
        <div className={'flex flex-col gap-4'}>
          <button
            className={'bg-gray-2 hover:bg-gray-4 rounded-lg p-2'}
            onClick={(e) => handleChangeStep(e, 'url')}>
            주소
          </button>
          <button
            className={'bg-gray-2 hover:bg-gray-4 rounded-lg p-2'}
            onClick={(e) => handleChangeStep(e, 'file')}>
            파일
          </button>
        </div>
      )}
      {step === 'url' && (
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
                onChange={(e: any) => setSrc(e.target.value)}
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
                onChange={(e: any) => setAltText(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className={'bg-gray-3 hover:bg-gray-5 rounded-lg p-2'}
              onClick={(e) => handleChangeStep(e, 'choice')}>
              뒤로
            </button>
            <button
              className={'bg-gray-3 hover:bg-gray-5 rounded-lg p-2'}
              onClick={handleClickInsert}>
              입력
            </button>
          </div>
        </div>
      )}
      {step === 'file' && (
        <div className={'flex flex-col gap-4'}>
          <div className="flex flex-col gap-4">
            <div className={'flex items-center justify-between gap-4'}>
              <label htmlFor="file" className={'font-bold'}>
                파일
              </label>
              <input
                className={
                  'border-gray-3 focus:border-gray-5 w-full flex-1 rounded-lg border p-2 focus:outline-none'
                }
                id={'file'}
                type="file"
                onChange={handleChangeImage}
                accept="image/*"
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
                onChange={(e: any) => setAltText(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className={'bg-gray-3 hover:bg-gray-5 rounded-lg p-2'}
              onClick={(e) => handleChangeStep(e, 'choice')}>
              뒤로
            </button>
            <button
              className={'bg-gray-3 hover:bg-gray-5 rounded-lg p-2'}
              onClick={handleClickInsert}>
              입력
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
