import {
  BaseFormFieldProps,
  CODE_GROUP,
  S3_PATH,
  S3UploaderConfig,
  useFileManager,
  useFormOptions,
  useS3Uploader,
} from '@learnway/hooks';
import { IcoDelete04 } from '@learnway/icons';
import { getDefaultLang } from '@learnway/shared';
import dynamicFormStyles from '@learnway/styles/bo/assets/styles/modules/dynamic.form.module.css';
import { Button } from '@learnway/ui/button';
import { ContentsRow } from '@learnway/ui/contents-row';
import { Dropdown } from '@learnway/ui/dropdown';
import { Input } from '@learnway/ui/input';
import { VideoSubtitle } from '@types';
import { t } from 'i18next';
import { map } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';

interface SubtitlesFormFieldProps extends BaseFormFieldProps<VideoSubtitle[]> {
  uploadConfig?: S3UploaderConfig;
}

const SubTitlesFormFieldComponent = forwardRef<HTMLDivElement, SubtitlesFormFieldProps>(
  ({ value = [], onChange, uploadConfig = {} as S3UploaderConfig }, ref) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const {
      s3Path = S3_PATH['upload/content/original'],
      affairsType = 'CMS',
      languageCode = getDefaultLang().toUpperCase(),
      groupMode = 'batch',
      auto = true,
      async = true,
      acceptFiles = ['vtt'],
      maxFileCount = 200,
      maxFileSize = 5 * 1024 * 1024,
    } = uploadConfig;

    const { files, addFiles, onFetch, onRemove, inputAccept } = useS3Uploader({
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
    const { getFileInfo } = useFileManager();

    const options = useFormOptions(undefined, {
      codeGroup: CODE_GROUP['pms.multilingual.LangCountryCode'],
    });

    const [newLangCode, setNewLangCode] = useState<string>(getDefaultLang().toUpperCase());

    async function fetchFileInfo(uuid: string[]) {
      const fileInfos = await Promise.all(uuid.map(getFileInfo));
      onFetch(fileInfos);
    }

    useEffect(() => {
      console.log('🚀 ~ SubTitlesFormFieldComponent ~ value:', value);
      if (value && value.length > 0 && files.length === 0) {
        fetchFileInfo(value.map(({ subtitleFileUuid }) => subtitleFileUuid));
      }
    }, [value]);

    const clickedSubtitleRef = useRef<string>('');

    useEffect(() => {
      const valueFileUuids = map(value, 'subtitleFileUuid');
      const newFiles = files.filter(
        ({ status, fileUuid }) =>
          ['fetched', 'completed'].includes(status) && !valueFileUuids.includes(fileUuid!),
      );
      if (newFiles.length !== 1) return;
      const newSubtitle = newFiles[0];
      if (!clickedSubtitleRef.current) {
        onChange([
          ...value,
          {
            languageCountryCode: newLangCode,
            subtitleFileUuid: newSubtitle.fileUuid!,
            subtitleName: newSubtitle.fileName,
          },
        ]);
        setNewLangCode(getDefaultLang().toUpperCase());
      } else {
        onChange(
          value.map((subtitle) =>
            subtitle.subtitleFileUuid === clickedSubtitleRef.current
              ? {
                  ...subtitle,
                  subtitleFileUuid: newSubtitle.fileUuid!,
                  subtitleName: newSubtitle.fileName,
                }
              : subtitle,
          ),
        );
        clickedSubtitleRef.current = '';
      }
    }, [files]);

    const handleLanguageCodeChange = (uuid: string, languageCountryCode: string) => {
      onChange(
        value.map((subtitle) =>
          subtitle.subtitleFileUuid === uuid ? { ...subtitle, languageCountryCode } : subtitle,
        ),
      );
    };

    const handleSubtitleChange = (uuid: string) => {
      clickedSubtitleRef.current = uuid;
      inputFileRef?.current?.click();
    };

    const handleSubtitleAdd = () => {
      clickedSubtitleRef.current = '';
      inputFileRef?.current?.click();
    };

    const handleFilesChange = async () => {
      if (!inputFileRef.current) return;
      const files = inputFileRef.current.files;
      if (files && files.length) {
        if (clickedSubtitleRef.current) await onRemove(clickedSubtitleRef.current, true);
        await addFiles(Array.from(files));
        inputFileRef.current.value = '';
      }
    };

    const handleSubtitleDelete = async (uuid: string) => {
      await onRemove(uuid, true);
      onChange(value.filter(({ subtitleFileUuid }) => subtitleFileUuid !== uuid));
    };

    return (
      <div className={dynamicFormStyles.multiple_row} ref={ref}>
        {value?.map((subtitle) => (
          <ContentsRow className={dynamicFormStyles.row_inner} key={subtitle.subtitleFileUuid}>
            <Dropdown
              className={dynamicFormStyles.short}
              options={options}
              value={subtitle.languageCountryCode}
              onChange={(code) => handleLanguageCodeChange(subtitle.subtitleFileUuid, code)}
            />
            <Input type="text" value={subtitle.subtitleName} />
            <Button
              variant="gray"
              size="sm"
              className={dynamicFormStyles.btn_edit}
              onClick={() => handleSubtitleChange(subtitle.subtitleFileUuid)}
            >
              {t('자막 변경')}
            </Button>
            <Button
              onlyIcon
              className={dynamicFormStyles.btn_delete}
              icon={<IcoDelete04 width={20} height={20} fill="none" stroke="#4C515E" />}
              onClick={() => handleSubtitleDelete(subtitle.subtitleFileUuid)}
            />
          </ContentsRow>
        ))}
        <ContentsRow className={dynamicFormStyles.row_inner}>
          <Dropdown
            className={dynamicFormStyles.short}
            options={options}
            value={newLangCode}
            onChange={(code) => setNewLangCode(code)}
          />
          <Input type="text" placeholder={t('자막추가 버튼을 클릭하여 자막 파일을 등록하세요.')} />
          <Button
            variant="gray"
            size="sm"
            className={dynamicFormStyles.btn_edit}
            onClick={handleSubtitleAdd}
          >
            {t('자막 추가')}
          </Button>
          <input
            type="file"
            ref={inputFileRef}
            className="hidden"
            accept={inputAccept}
            onChange={handleFilesChange}
          />
        </ContentsRow>
      </div>
    );
  },
);

export const SubTitlesFormField = SubTitlesFormFieldComponent;
