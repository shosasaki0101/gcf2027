import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentLanguage, getLanguageUrl, type Language } from '../../utils/i18n';

export const LanguageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = getCurrentLanguage(location.pathname);

  const handleLanguageChange = (targetLanguage: Language) => {
    const newUrl = getLanguageUrl(location.pathname, targetLanguage);
    navigate(newUrl);
  };

  return (
    <div className="flex items-center gap-0.5 bg-[rgba(255,255,255,0.1)] rounded-md p-0.5">
      <div
        onClick={() => handleLanguageChange('ja')}
        className={`px-2 py-1 rounded-sm text-xs font-medium transition-all duration-200 cursor-pointer ${
          currentLanguage === 'ja'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.1)]'
        }`}
      >
        日
      </div>
      <div
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded-sm text-xs font-medium transition-all duration-200 cursor-pointer ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.1)]'
        }`}
      >
        En
      </div>
    </div>
  );
};
