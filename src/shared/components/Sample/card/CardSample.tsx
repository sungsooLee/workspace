import CommonCard from './CommonCard';

export const TestCommonCard = ({ cardData }: any) => {
  return (
    <>
      <CommonCard>
        <CommonCard.Title>Company CommonCard</CommonCard.Title>
        <CommonCard.Contents>
          기 본 카 드<p>{cardData?.contents}</p>
        </CommonCard.Contents>
      </CommonCard>
    </>
  );
};

const CompanyACard = ({ cardData }: any) => {
  return (
    <CommonCard className='border-2 border-blue-500'>
      <CommonCard.Title className='text-blue-500'>Company A</CommonCard.Title>
      <CommonCard.Contents className='bg-blue-100'>
        <p>This is the content for Company A.</p>
        <p>{cardData?.contents}</p>
      </CommonCard.Contents>
      <CommonCard.Buttons>
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
          Button A
        </button>
      </CommonCard.Buttons>
    </CommonCard>
  );
};

const CompanyBCard = ({ cardData }: any) => {
  return (
    <CommonCard className='border-2 border-green-500'>
      <CommonCard.Title className='text-green-500'>Company B</CommonCard.Title>
      <CommonCard.Contents className='bg-green-100'>
        <p>This is the content for Company B.</p>
        <p>{cardData?.contents}</p>
      </CommonCard.Contents>
      <CommonCard.Buttons>
        <button className='rounded bg-green-500 px-4 py-2 text-white'>
          Button B
        </button>
      </CommonCard.Buttons>
    </CommonCard>
  );
};

const companyCards = {
  TestCommonCard,
  CompanyACard,
  CompanyBCard,
};

export default companyCards;
