import { useLanguage } from '../context/language-context';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="text-center text-gray-500 mb-10 px-4">
      <small className="block text-xs">&copy; 2026 Luciano Guerrero. {t.footer.rights}</small>
      <p className="text-xs mt-2">
        <span className="font-semibold">{t.footer.built}</span> {t.footer.builtText}
      </p>
    </footer>
  );
}
