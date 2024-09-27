import CardRenderer from '../../shared/components/sample/card/CardRenderer';
import InputFormRenderer from '../../shared/components/sample/InputForm/InputFormRenderer';

const RenderSample = ({ companyType }: { companyType: string }) => {
  return (
    <div className='flex flex-col space-y-20 p-10'>
      <div className='flex items-center justify-center'>
        <CardRenderer
          companyType={companyType}
          cardData={{ contents: 'API 응답 데이터' }}
        />
      </div>

      <InputFormRenderer companyType={companyType} />
    </div>
  );
};

export default RenderSample;
