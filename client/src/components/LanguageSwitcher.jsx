import { useLanguage } from '../utils/i18n';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
                padding: '5px',
                marginLeft: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd'
            }}
        >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
        </select>
    );
};

export default LanguageSwitcher;
