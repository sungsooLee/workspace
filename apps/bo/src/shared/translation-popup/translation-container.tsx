import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { t } from 'i18next';
import { useWatch } from 'react-hook-form';

const TranslationContainer: FC<any> = ({ control, defaultLang, children }) => {
  const translations = useWatch({ control: control, name: 'translations' });
  const [activeLocale, setActiveLocale] = useState();
  const [{ translationCount, totalCount }, setCount] = useState({
    translationCount: 0,
    totalCount: 0,
  });

  const childrenWithProps = useMemo(
    () =>
      Children.toArray(children).map((child) => {
        if (
          isValidElement(child) &&
          ((child.type as any).displayName === 'TranslationBody' ||
            (child.type as any).name === 'TranslationBody')
        ) {
          return cloneElement(child as ReactElement, {
            control,
            defaultLang,
            locale: activeLocale,
          });
        }
        return child;
      }),
    [children, control, defaultLang, activeLocale],
  );
  useEffect(() => {
    if (translations) {
      setCount({
        translationCount: translations.filter((item: any) => item.translation.trim() !== '').length,
        totalCount: translations.length,
      });

      if (!activeLocale) {
        const find = translations.find((translation: any) => translation.locale !== defaultLang);
        if (find) {
          setActiveLocale(localeCodes[find.locale] as any);
        }
      }
    }
  }, [translations]);
  return (
    translations &&
    activeLocale && (
      <>
        <div className="flex items-center space-x-2 bg-white p-4 shadow-md">
          {translations
            .filter((translation: any) => translation.locale !== defaultLang)
            .map((translation: any) => (
              <button
                key={translation.locale}
                type={'button'}
                className={`rounded bg-gray-200 px-4 py-2 ${activeLocale === translation.locale ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveLocale(translation.locale)}>
                {t(localeCodes[translation.locale])}
              </button>
            ))}
        </div>
        <div className="mt-4 bg-white p-4 shadow-md">
          <label className="block font-semibold text-gray-700">다국어 번역 * {activeLocale}</label>
          <input
            type="text"
            className="mt-2 w-full rounded border border-gray-300 p-2"
            value={`${translationCount}/${totalCount}`}
            readOnly={true}
          />
        </div>
        <div className="mt-4 bg-white p-4 shadow-md">
          <label className="block font-semibold text-gray-700">상태</label>
          <input
            type="text"
            className="mt-2 w-full rounded border border-gray-300 p-2"
            value={`${translationCount === totalCount ? '번역완료' : '번역필요'}`}
            readOnly
          />
        </div>
        {childrenWithProps}
      </>
    )
  );
};

export default TranslationContainer;

const localeCodes: { [key: string]: string } = {
  kr: 'kr',
  ar: 'ar',
  zh: 'zh',
  'zh-TW': 'zh-TW',
  hr: 'hr',
  de: 'de',
  en: 'en',
  'en-AU': 'en-AU',
  et: 'et',
  fr: 'fr',
  he: 'he',
  hi: 'hi',
  id: 'id',
  it: 'it',
  ja: 'ja',
  ms: 'ms',
  ne: 'ne',
  fa: 'fa',
  pt: 'pt',
  'pt-BR': 'pt-BR',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  es: 'es',
  'es-LA': 'es-LA',
  th: 'th',
  tr: 'tr',
  vi: 'vi',
};
