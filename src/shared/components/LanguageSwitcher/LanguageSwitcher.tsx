import useLanguageStore from '@/shared/stores/useLanguageStore';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value='ko'>한국어</option>
      <option value='en'>English</option>
    </select>
  );
}
export default LanguageSwitcher;
