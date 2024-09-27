import { Suspense } from 'react';
import companyComponentMap from '../card/companyComponentMap';

const InputFormRenderer = ({ companyType, cardData }: any) => {
  const renderCompanySpecificForm = () => {
    if (companyComponentMap[companyType]) {
      const CompanySpecificForm = companyComponentMap[companyType].Form;
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <CompanySpecificForm cardData={cardData} />
        </Suspense>
      );
    }
    return <></>;
  };

  return <div>{renderCompanySpecificForm()}</div>;
};

export default InputFormRenderer;
