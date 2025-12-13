import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../utils/i18n';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { t } = useLanguage();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {user && <button onClick={toggleSidebar} className="btn" style={{ marginRight: '10px', fontSize: '1.2rem' }}>&#9776;</button>}
                <div className="logo">
                    <Link to="/">PravasiSetu</Link>
                </div>
            </div>
            <ul>
                <li><LanguageSwitcher /></li>
                {user ? (
                    <>
                        <li>
                            <button className="btn" onClick={onLogout}>{t('logout')}</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">{t('login')}</Link>
                        </li>
                        <li>
                            <Link to="/register">{t('register')}</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
