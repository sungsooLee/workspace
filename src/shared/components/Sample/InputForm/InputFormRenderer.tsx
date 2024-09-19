import { Suspense } from 'react';
import companyComponentMap from '../card/companyComponentMap';

const InputFormRenderer = ({ companyType, cardData }: any) => {
  const renderCompanySpecificCard = () => {
    if (companyComponentMap[companyType]) {
      const CompanySpecificCard = companyComponentMap[companyType].Form;
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <CompanySpecificCard cardData={cardData} />
        </Suspense>
      );
    }
    return <></>;
  };

  return <div>{renderCompanySpecificCard()}</div>;
};

export default InputFormRenderer;
