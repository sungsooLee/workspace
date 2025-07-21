import { forwardRef, useEffect, useState } from 'react';
import {
  BaseFormFieldProps,
  CODE_GROUP,
  S3UploaderConfig,
  useFormOptions,
  useS3Uploader,
} from '@learnway/hooks';
import { Button, ContentsRow, Dropdown, DropdownOption, Input } from '@learnway/ui';
import { t } from 'i18next';
import { IcoDelete04 } from '@learnway/icons';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { VideoSubtitles } from '@types';

interface SubtitlesFormFieldProps extends BaseFormFieldProps<VideoSubtitles[]> {
  uploadConfig: S3UploaderConfig;
}

const SubTitlesFormFieldComponent = forwardRef<HTMLDivElement, SubtitlesFormFieldProps>(
  ({ value, onChange, uploadConfig }, ref) => {
    const {
      s3Path,
      affairsType,
      languageCode,
      groupMode = 'batch',
      auto = true,
      async = true,
      acceptFiles = [],
      maxFileCount = 10,
      maxFileSize = 5 * 1024 * 1024,
    } = uploadConfig;

    const { groupUuid, files, addFiles, onFetch, onRemove } = useS3Uploader({
      s3Path,
      affairsType,
      languageCode,
      groupMode,
      auto,
      async,
      acceptFiles,
      maxFileCount,
      maxFileSize,
    });

    const options = useFormOptions(undefined, {
      codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
    });

    const [newSubtitle, setNewSubtitle] = useState<any>({});

    useEffect(() => {
      //value로 onFetch, groupUuid초기화
    }, []);

    const handleLanguageCodeChange = (index: number, code: string) => {
      console.log('languageCode:', code);
    };

    const handleSubtitleChange = (index: number) => {
      // input file 띄워서 addFiles에 추가 후 index에 해당하는 fileUuid 삭제 및 새로운 uuid로 대체, 변경 결과를 onChange에 반영
    };

    const handleSubtitleAdd = () => {
      // input file 띄워서 addFiles에 추가 후 files 변경 결과를 onChange에 반영
    };

    return (
      <div className={dynamicFormStyles.multiple_row}>
        <div ref={ref}>
          {value?.map((subtitle, index: number) => (
            <ContentsRow className={dynamicFormStyles.row_inner} key={subtitle.subtitleFileUuid}>
              <Dropdown
                className={dynamicFormStyles.short}
                options={options}
                value={subtitle.languageCode}
                onChange={(code) => handleLanguageCodeChange(index, code)}
              />
              <Input type="text" value={subtitle.subtitleName} />
              <Button
                variant="gray"
                size="sm"
                className={dynamicFormStyles.btn_edit}
                onClick={() => handleSubtitleChange(index)}
              >
                자막 변경
              </Button>
              <Button
                onlyIcon
                className={dynamicFormStyles.btn_delete}
                icon={<IcoDelete04 width={20} height={20} fill="none" stroke="#4C515E" />}
              />
            </ContentsRow>
          ))}
          <ContentsRow className={dynamicFormStyles.row_inner}>
            <Dropdown
              className={dynamicFormStyles.short}
              options={options}
              value={newSubtitle.languageCode}
              onChange={(code) => setNewSubtitle((prev: any) => ({ ...prev, languageCode: code }))}
            />
            <Input
              type="text"
              readOnly
              placeholder="자막추가 버튼을 클릭하여 자막 파일을 등록하세요."
            />
            <Button
              variant="gray"
              size="sm"
              className={dynamicFormStyles.btn_edit}
              onClick={handleSubtitleAdd}
            >
              자막 추가
            </Button>
            {/* <input type="file" className={'hidden'} ref={fileRef} /> */}
          </ContentsRow>
        </div>
      </div>
    );
  },
);

export const SubTitlesFormField = SubTitlesFormFieldComponent;
