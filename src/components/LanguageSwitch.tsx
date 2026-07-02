import { useLanguage } from '../context/language-context';

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      className="fixed bottom-5 left-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 text-sm font-semibold text-gray-700 dark:text-gray-300"
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es' ? 'ES' : 'EN'}
    </button>
  );
}
