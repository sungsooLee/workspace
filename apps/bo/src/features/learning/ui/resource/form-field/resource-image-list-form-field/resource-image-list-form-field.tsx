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

  /**
   * 원본 다운로드 버튼 클릭 핸들러
   * @returns {void}
   */
  const handleDownloadButtonClick = () => {
    console.log('원본 다운로드');
    // 실제 다운로드 로직 구현
  };

  /**
   * 이미지 변경 버튼 클릭 핸들러
   * @returns {void}
   */
  const handleChangeImageButtonClick = () => {
    console.log('이미지 변경');
    // 실제 이미지 변경 로직 구현
  };

  /**
   * 미리보기 버튼 클릭 핸들러
   * @returns {void}
   */
  const handlePreviewButtonClick = () => {
    console.log('미리보기');
    // 실제 미리보기 로직 구현
  };

  /**
   * 옵션 삭제 핸들러
   * @param {object} option - 삭제할 옵션 객체
   * @returns {void}
   */
  const handleOptionDeleteClick = (option: any) => {
    const newValue = value?.filter((d) => d.id !== option.id);
    onChange?.(newValue);
  };

  /**
   * 옵션 순서 변경 핸들러
   * @param {object[]} newOptions - 새로운 옵션 목록
   * @returns {void}
   */
  const handleOptionsOrderChange = (newOptions: any) => onChange?.(newOptions);

  return (
    <div className={cn(styles.start)} ref={ref}>
      <strong className={style.title}>{t('업로드 파일')}</strong>
      <ul className={style.btn_list}>
        <li>
          <Button
            className={style.btn_text}
            label={t('원본 다운로드')}
            onClick={handleDownloadButtonClick}
          />
        </li>
        <li>
          <Button
            className={style.btn_text}
            label={t('이미지 변경')}
            onClick={handleChangeImageButtonClick}
          />
        </li>
        <li>
          <Button
            className={style.btn_text}
            label={t('미리보기')}
            onClick={handlePreviewButtonClick}
          />
        </li>
      </ul>
      {/* image list */}
      <List
        options={value}
        valueField={'id'}
        deletable
        draggable
        hideBorder
        showItemBorder
        itemRenderer={(option: any) => (
          <div className={style.thumb_wrap}>
            <Thumbnail width={84} height={55} path={option.path} className={style.image} />
            <span className={style.thumb_name}>{option.name}</span>
          </div>
        )}
        onOptionDeleteClick={handleOptionDeleteClick}
        onOptionsOrderChange={handleOptionsOrderChange}
      />
    </div>
  );
});

export const ResourceImageListFormField = ResourceImageListFormFieldComponent;
