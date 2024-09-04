import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

interface InputPageTitleProps {
  children?: ReactNode;
}

function InputPageTitle({ children }: InputPageTitleProps) {
  return <div className='w-full'>{children}</div>;
}

interface InputPageContentsProps {
  children?: ReactNode;
}

function InputPageContents({ children }: InputPageContentsProps) {
  return <div>{children}</div>;
}

interface InputPageMainProps {
  children?: ReactNode;
}

function InputPageMain({ children }: InputPageMainProps) {
  return <div>{children}</div>;
}

export const InputPage = Object.assign(InputPageMain, {
  Title: InputPageTitle,
  Contents: InputPageContents,
});

const InputSampleComp = () => {
  return (
    <>
      <InputPage>
        <InputPage.Title>타이틀</InputPage.Title>
        <InputPage.Contents>컨텐츠....</InputPage.Contents>
      </InputPage>
    </>
  );
};

export default InputSampleComp;
