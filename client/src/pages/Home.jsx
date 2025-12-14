import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HardHat, Building2, BadgeCheck, ArrowRight, Shield, Globe, Users, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg
                            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">{t('hero_title')}</span>{' '}
                                    <span className="block text-blue-700 xl:inline">{t('hero_subtitle')}</span>
                                </h1>
                                <p className="mt-3 text-base text-slate-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    {t('hero_desc')}
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    {!user ? (
                                        <>
                                            <div className="rounded-md shadow">
                                                <Link
                                                    to="/register"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10 transition-transform transform hover:-translate-y-1 shadow-blue-500/50 hover:shadow-blue-600/50"
                                                >
                                                    {t('get_started')}
                                                </Link>
                                            </div>
                                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                                <Link
                                                    to="/login"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 md:py-4 md:text-lg md:px-10 transition-transform transform hover:-translate-y-1"
                                                >
                                                    {t('log_in')}
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="rounded-md shadow">
                                            <Link
                                                to={user.role === 'worker' ? '/worker-dashboard' : user.role === 'employer' ? '/employer-dashboard' : '/officer-dashboard'}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10 transition-transform transform hover:-translate-y-1"
                                            >
                                                {t('go_to_dashboard')} <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-50 overflow-hidden">
                    {/* Animated Background */}
                    <div className="relative h-full w-full bg-slate-50 flex items-center justify-center">
                        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                        <div className="relative z-10 grid grid-cols-2 gap-6 p-8 opacity-90 transform rotate-[-5deg]">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-40 w-40 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl border border-white/40 animate-fade-in-up"
                                    style={{ animationDelay: `${i * 0.2}s` }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t('features_title')}</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            {t('features_subtitle')}
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                            {t('features_desc')}
                        </p>
                    </div>

                    <div className="mt-16">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {[
                                {
                                    name: t('for_workers'),
                                    description: t('for_workers_desc'),
                                    icon: HardHat,
                                    color: 'bg-blue-600',
                                },
                                {
                                    name: t('for_employers'),
                                    description: t('for_employers_desc'),
                                    icon: Building2,
                                    color: 'bg-slate-800',
                                },
                                {
                                    name: t('gov_support'),
                                    description: t('gov_support_desc'),
                                    icon: BadgeCheck,
                                    color: 'bg-teal-600',
                                },
                            ].map((feature, index) => (
                                <div key={feature.name} className="relative group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                    <div className="relative p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                        <dt>
                                            <div className={cn("absolute flex items-center justify-center h-14 w-14 rounded-xl text-white shadow-lg", feature.color)}>
                                                <feature.icon className="h-7 w-7" aria-hidden="true" />
                                            </div>
                                            <p className="ml-20 text-xl leading-6 font-bold text-slate-900">{feature.name}</p>
                                        </dt>
                                        <dd className="mt-4 ml-20 text-base text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Stats/Trust Section */}
            <div className="bg-slate-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            {t('trusted_by')}
                        </h2>
                        <p className="mt-3 text-xl text-slate-400 sm:mt-4">
                            {t('trusted_desc')}
                        </p>
                    </div>
                    <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                        <div className="flex flex-col">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-slate-300">{t('workers_registered')}</dt>
                            <dd className="order-1 text-5xl font-extrabold text-blue-500">100k+</dd>
                        </div>
                        <div className="flex flex-col mt-10 sm:mt-0">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-slate-300">{t('jobs_posted')}</dt>
                            <dd className="order-1 text-5xl font-extrabold text-blue-500">50k+</dd>
                        </div>
                        <div className="flex flex-col mt-10 sm:mt-0">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-slate-300">{t('districts_covered')}</dt>
                            <dd className="order-1 text-5xl font-extrabold text-blue-500">500+</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-white text-lg font-bold mb-4">PravasiSetu</h3>
                            <p className="text-sm text-slate-400">
                                {t('footer_desc')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">{t('quick_links')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('find_job')}</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('hire_workers')}</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('gov_schemes')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">{t('support')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('help_center')}</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('worker_safety')}</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('contact_us')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">{t('legal')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('privacy_policy')}</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('terms_of_service')}</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">{t('grievance_redressal')}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                        <p>&copy; 2025 PravasiSetu. {t('rights_reserved')}</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
