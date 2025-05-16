import React, { FC, memo, useState, useEffect } from 'react';
import { cn } from '@learnway/shared';
import { t } from 'i18next';
import {
  ModalBody,
  ModalContainer,
  ModalTitle,
  ContentsRow,
  Input,
  Button,
  Pagination,
  useModal,
} from '@learnway/ui';

import formStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import styles from './address-search-modal.module.css';

const PAGE_SIZE = 3;
// SQL 예약어 필터링
const RESERVED_WORD_SQL = [
  'OR',
  'SELECT',
  'INSERT',
  'DELETE',
  'UPDATE',
  'CREATE',
  'DROP',
  'EXEC',
  'UNION',
  'FETCH',
  'DECLARE',
  'TRUNCATE',
];

const AddressSearchModalComponent: FC<any> = ({ onSelect }) => {
  const { close } = useModal();

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [errorCode, setErrorCode] = useState('0');

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 0) {
      searchAddress(pageIndex + 1, searchKeyword);
    }
  }, [pageIndex, searchKeyword]);

  const handleOnSearch = async () => {
    if (searchValue.length > 0) {
      if (new RegExp(/[%=><]/).test(searchValue)) setErrorCode('E0013');
      else {
        setSearchKeyword(searchValue);
        setPageIndex(0);
      }
    } else {
      setSearchKeyword('');
      setPageIndex(0);
      setTotalRows(0);
    }
  };

  const removeReservedWords = (input: string) => {
    let replaced = input;
    RESERVED_WORD_SQL.map((word) => {
      const regExp = new RegExp(word, 'gi');
      if (regExp.test(input)) {
        replaced = input.replace(word, '');
      }
    });
    return replaced;
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(removeReservedWords(value).trim());
  };

  const searchAddress = async (currentPage: number, keyword: string) => {
    const formData = new FormData();
    formData.append('currentPage', currentPage.toString());
    formData.append('countPerPage', PAGE_SIZE.toString());
    formData.append('resultType', 'json');
    formData.append('confmKey', 'devU01TX0FVVEgyMDI1MDUxNDA5MjA0MzExNTc0NzM=');
    formData.append('keyword', keyword.trim());

    const response = await fetch('/juso-api/addrlink/addrLinkApi.do', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
    }

    const data = await response.json();
    if (data.results.common.errorCode === '0') {
      setSearchResult(data.results.juso);
    } else {
      setSearchResult([]);
    }
    setErrorCode(data.results.common.errorCode);
    setTotalRows(data.results.common.totalCount);
    setTotalPage(Math.ceil(data.results.common.totalCount / PAGE_SIZE));
  };

  const handleSelect = (item: any) => {
    onSelect(item);
    close();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value - 1);
  };

  /*
  const renderPagination = () => {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.root, styles.pagination, 'nlp--pagination')}
      >
        <div>
          <Button onClick={() => handlePageChange(0)} disabled={pageIndex === 0} onlyIcon>
            {<IcoChevronLeftDouble width={32} height={32} fill="#4C515E" />}
          </Button>
          <Button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0}>
            {<IcoChevronLeft width={32} height={32} fill="#4C515E" />}
          </Button>

          <div>
            {Array.from({ length: totalPage }, (_, i) => (
              <Button key={i} onClick={() => handlePageChange(i)}>
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= totalPage - 1}
          >
            {<IcoChevronRight width={32} height={32} fill="#4C515E" />}
          </Button>
          <Button
            onClick={() => handlePageChange(totalPage - 1)}
            disabled={pageIndex >= totalPage - 1}
          >
            {<IcoChevronRightDouble width={32} height={32} fill="#4C515E" />}
          </Button>
        </div>
      </div>
    );
  };*/

  const getError = () => {
    return errorCode !== '0' ? (
      <p className={cn(formStyles.guide_text, formStyles.error)}>
        {t('LABEL.modal.addressSearch.error.' + errorCode.toLowerCase())}
      </p>
    ) : null;
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('LABEL.modal.addressSearch.title')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.address}`}>
          <div className={styles.input_box}>
            <ContentsRow>
              <div className={formStyles.form_item}>
                <div className={formStyles.input_box}>
                  <Input
                    id="searchWord"
                    type="text"
                    placeholder={t('LABEL.modal.addressSearch.placeholder')}
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  <Button variant="primary" size="lg" onClick={handleOnSearch}>
                    {t('LABEL.button.retrieve')}
                  </Button>
                </div>
                {getError()}
              </div>
            </ContentsRow>
          </div>
          {totalRows > 0 ? (
            <div className={styles.address_list}>
              <ul>
                {searchResult.length > 0 &&
                  searchResult.map((item) => (
                    <li>
                      <Button onClick={() => handleSelect(item)}>
                        <p>
                          <strong>{item.roadAddr}</strong>
                          <span>{item.jibunAddr}</span>
                          <span>
                            {t('LABEL.modal.addressSearch.zipCodePrefix')}
                            {item.zipNo}
                          </span>
                        </p>
                        <span>{t('LABEL.button.select')}</span>
                      </Button>
                    </li>
                  ))}
              </ul>
              {/**renderPagination()*/}
              <Pagination
                className={styles.pagenation}
                count={totalPage}
                page={pageIndex + 1}
                onChange={handlePageChange}
              />
            </div>
          ) : (
            <div className={styles.example_box}>
              <p>{t('LABEL.modal.addressSearch.guideText')}</p>
              <div className={styles.box}>
                <dl>
                  <dt>{t('LABEL.modal.addressSearch.roadAddress')}</dt>
                  <dd>{t('LABEL.modal.addressSearch.sampleRoadAddress')}</dd>
                </dl>
                <dl>
                  <dt>{t('LABEL.modal.addressSearch.jibunAddress')}</dt>
                  <dd>{t('LABEL.modal.addressSearch.sampleJibunAddress')}</dd>
                </dl>
              </div>
            </div>
          )}
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const AddressSearchModal = AddressSearchModalComponent;
