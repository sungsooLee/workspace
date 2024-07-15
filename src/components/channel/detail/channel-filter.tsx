import { Button } from '@/components/ui/button';
import {
  LearningFormatEnum,
  LearningTypeEnum,
} from '@/constants/enums/LearningEnum';
import { getEnumKeyByValue, getEnumValueByKey } from '@/lib/utils/enum';

interface FilterProps {
  selectedType: LearningTypeEnum | LearningTypeEnum.ALL;
  selectedFormats: LearningFormatEnum[];
  onTypeSelect: (type: LearningTypeEnum) => void;
  onFormatToggle: (format: LearningFormatEnum) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedType,
  selectedFormats,
  onTypeSelect,
  onFormatToggle,
}) => {
  return (
    <div className='w-full flex flex-col p-20pxr lg:px-50pxr items-start'>
      <div>
        <div className='font-bold flex flex-row items-center'>
          조회필터
          <hr className='w-12 h-1 ml-4 mx-auto my-4 bg-black border-0 rounded' />
        </div>
      </div>
      <div className='w-full pt-20pxr px-25pxr'>
        <div className='pb-37pxr flex flex-row items-center truncate'>
          학습 유형
          <div className='space-x-80pxr ml-40pxr flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden'>
            {Object.values(LearningTypeEnum).map((type) => (
              <p
                key={type}
                onClick={() =>
                  onTypeSelect(
                    getEnumKeyByValue(
                      LearningTypeEnum,
                      type
                    ) as LearningTypeEnum
                  )
                }
                className={`cursor-pointer hover:text-blue-500 ${getEnumValueByKey(LearningTypeEnum, selectedType) === type ? 'font-bold text-xl' : 'font-normal text-base'}`}
              >
                {type}
              </p>
            ))}
          </div>
        </div>
        <div className='pb-37pxr flex flex-row items-center truncate'>
          학습 포맷
          <div className='space-x-40pxr ml-40pxr flex flex-row flex-nowrap overflow-x-auto overflow-y-hidden'>
            {Object.values(LearningFormatEnum).map((format) => (
              <Button
                key={format}
                onClick={() => onFormatToggle(format)}
                className={`hover:text-white transition-transform duration-300 ${selectedFormats.includes(format) ? 'bg-gray-700 text-white transform scale-110' : 'bg-gray-300 text-gray-700 transform sacle-100'}`}
              >{`${'#' + format}`}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
