import { Suspense } from 'react';
import companyComponentMap from './companyComponentMap';
import { TestCommonCard } from './CardSample';

const CardRenderer = ({ companyType, cardData }: any) => {
  const renderCompanySpecificCard = () => {
    if (companyComponentMap[companyType]) {
      const CompanySpecificCard = companyComponentMap[companyType].Card;
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <CompanySpecificCard cardData={cardData} />
        </Suspense>
      );
    }
    return (
      <>
        <TestCommonCard cardData={cardData} />
      </>
    );
  };

  return <div>{renderCompanySpecificCard()}</div>;
};

export default CardRenderer;
