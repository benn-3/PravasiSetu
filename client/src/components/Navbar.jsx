import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../utils/i18n';
import { LogOut, Menu, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

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
        <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {user && (
                        <button
                            onClick={toggleSidebar}
                            className="p-2 -ml-2 rounded-md hover:bg-slate-100 text-slate-600 md:hidden"
                            aria-label="Toggle Menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    )}

                    {!user && (
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700 tracking-tight">
                            <img src="/logo.png" alt="PravasiSetu Logo" className="h-10 w-auto" />
                            PravasiSetu
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />

                    {user ? (
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">{t('logout')}</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                            >
                                {t('login')}
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm shadow-blue-500/20"
                            >
                                {t('register')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
