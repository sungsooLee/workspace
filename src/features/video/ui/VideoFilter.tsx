import {
  LearningFormatEnum,
  LearningTypeEnum,
} from '@/entities/learning/model/learning';
import { Button } from '@/shared/components/ui/button';
import { getEnumKeyByValue, getEnumValueByKey } from '@/shared/utils/enum';

interface FilterProps {
  selectedType: LearningTypeEnum | LearningTypeEnum.ALL;
  selectedFormats: LearningFormatEnum[];
  onTypeSelect: (type: LearningTypeEnum) => void;
  onFormatToggle: (format: LearningFormatEnum) => void;
}

const VideoFilter: React.FC<FilterProps> = ({
  selectedType,
  selectedFormats,
  onTypeSelect,
  onFormatToggle,
}) => {
  return (
    <div className='flex w-full flex-col items-start p-20pxr lg:px-50pxr'>
      <div>
        <div className='flex flex-row items-center font-bold'>
          조회필터
          <hr className='mx-auto my-4 ml-4 h-1 w-12 rounded border-0 bg-black' />
        </div>
      </div>
      <div className='w-full px-25pxr pt-20pxr'>
        <div className='flex flex-row items-center truncate pb-37pxr'>
          학습 유형
          <div className='ml-40pxr flex flex-row flex-nowrap space-x-80pxr overflow-x-auto overflow-y-hidden'>
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
                className={`cursor-pointer hover:text-blue-500 ${getEnumValueByKey(LearningTypeEnum, selectedType) === type ? 'text-xl font-bold' : 'text-base font-normal'}`}
              >
                {type}
              </p>
            ))}
          </div>
        </div>
        <div className='flex flex-row items-center truncate pb-37pxr'>
          학습 포맷
          <div className='ml-40pxr flex flex-row flex-nowrap space-x-40pxr overflow-x-auto overflow-y-hidden'>
            {Object.values(LearningFormatEnum).map((format) => (
              <Button
                key={format}
                onClick={() => onFormatToggle(format)}
                className={`transition-transform duration-300 hover:text-white ${selectedFormats.includes(format) ? 'scale-110 transform bg-gray-700 text-white' : 'sacle-100 transform bg-gray-300 text-gray-700'}`}
              >{`${'#' + format}`}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoFilter;
