import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import formStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { Button, Input, Select, useToast } from '@learnway/ui';
import { useFieldArray } from 'react-hook-form';
import { LOCALES } from '@learnway/config';
import { t } from 'i18next';
const emptyValue = {
  locale: 'selected-empty',
  subtitle: '',
  index: -1,
};
const localeOptions = Object.entries(LOCALES).map(([_, value]) => ({
  value: value,
  label: t(value),
}));

const FormSubtitlesComponent = forwardRef<any, any>(({ control, name }) => {
  const [defaultSubtitles, setDefaultSubtitles] = useState<any>(emptyValue);
  const [currentSubtitles, setCurrentSubtitles] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { open: openToast } = useToast();

  /**
   * 자막 파일 추가/변경
   */
  const handleChangeSubtitles = (currentSubtitle: any) => {
    fileInputRef.current?.click();
    setCurrentSubtitles(currentSubtitle);
  };

  // 파일 선택 시 상태 변경
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) {
      // TODO. FILE 업로드 이벤트 추가 해야함
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop(); // png
      if (fileExtension !== 'vtt') {
        openToast({
          description: '자막 파일(.vtt)을 등록하세요.',
        });
      } else {
        append({
          locale: currentSubtitles.locale,
          subtitles: fileName,
        });
      }
      event.target.value = '';
    }
  };

  const handleClickToast = () => {
    openToast({
      title: 'toast title',
      description: 'toast desc',
    });
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        /*accept={'.vtt'}*/
        style={{ display: 'none' }}
      />
      {fields.map((field: any, index) => {
        return (
          <div className={'flex gap-10'}>
            <Select
              value={field.value}
              options={localeOptions}
              /*onChange={(selected) => handleLocaleChange(selected)}*/
            />
            <Input value={field.subtitles} readOnly={true} />
            <Button
              variant="gray"
              size="sm"
              className={formStyles.btn_edit}
              onClick={() => handleChangeSubtitles({ index, ...field })}>
              자막 변경
            </Button>
            <Button
              variant="gray"
              size="sm"
              className={formStyles.btn_edit}
              onClick={() => remove(index)}>
              삭제
            </Button>
          </div>
        );
      })}
      <div className={'flex gap-10'}>
        <Select
          value={defaultSubtitles.locale}
          options={[{ value: 'selected-empty', label: t('언어선택') }, ...localeOptions]}
          onChange={(selected) => setDefaultSubtitles({ locale: selected.value })}
        />
        <Input readOnly />
        <Button
          variant="gray"
          size="sm"
          className={formStyles.btn_edit}
          onClick={() => handleChangeSubtitles(defaultSubtitles)}>
          자막 추가
        </Button>
      </div>
    </>
  );
});

export const FormSubtitles = FormSubtitlesComponent;
