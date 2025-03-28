import React, { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Button, List, Thumbnail } from '@learnway/ui';
import { useTranslation } from 'react-i18next';
import style from '@learnway/styles/bo/assets/styles/modules/movie-info.module.css';
import styles from './resource-image-list-form-field.module.css';
import { cn } from '@learnway/shared';

interface ResourceImageListFormFieldPros extends BaseFormFieldProps<any[]> {
  dummy?: string;
}

const ResourceImageListFormFieldComponent = forwardRef<
  HTMLDivElement,
  ResourceImageListFormFieldPros
>(({ value, onChange }, ref) => {
  const { t } = useTranslation();

  const handleDownloadClick = () => {
    console.log('원본 다운로드');
  };

  const handleRenameClick = () => {
    console.log('파일 변경');
  };

  const handleChangeImageClick = () => {
    console.log('이미지 변경');
  };

  const handlePreviewClick = () => {
    console.log('미리보기');
  };

  const handleOptionDeleteClick = (option: any) => {
    const newValue = value?.filter((d) => d.id !== option.id);
    onChange(newValue);
  };

  return (
    <div className={cn(styles.start)}>
      <strong className={style.title}>{t('업로드 파일')}</strong>
      <ul className={style.btn_list}>
        <li>
          <Button
            className={style.btn_text}
            label={t('원본 다운로드')}
            onClick={handleDownloadClick}
          />
        </li>
        <li>
          <Button className={style.btn_text} label={t('파일 변경')} onClick={handleRenameClick} />
        </li>
        <li>
          <Button
            className={style.btn_text}
            label={t('이미지 변경')}
            onClick={handleChangeImageClick}
          />
        </li>
        <li>
          <Button className={style.btn_text} label={t('미리보기')} onClick={handlePreviewClick} />
        </li>
      </ul>
      {/* image list */}
      <List
        options={value}
        deletable
        draggable
        itemRenderer={(option: any) => (
          <div className={'m-2 flex flex-row items-center gap-3'}>
            <Thumbnail width={84} height={55} path={option.path} />
            <span>{option.name}</span>
          </div>
        )}
        onOptionDeleteClick={handleOptionDeleteClick}
      />
    </div>
  );
});

export const ResourceImageListFormField = ResourceImageListFormFieldComponent;
