import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HardHat, Building2, BadgeCheck, ArrowRight, Shield, Globe, Users, CheckCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50"
                    />
                    {/* Animated shapes */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-100/50 blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="relative pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
                        <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={staggerContainer}
                                className="sm:text-center lg:text-left"
                            >
                                <motion.div variants={fadeInUp}>
                                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
                                        Beta Release v1.0
                                    </span>
                                </motion.div>
                                <motion.h1 variants={fadeInUp} className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl mb-6">
                                    <span className="block xl:inline">{t('hero_title')}</span>{' '}
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 xl:inline leading-tight pb-2">{t('hero_subtitle')}</span>
                                </motion.h1>
                                <motion.p variants={fadeInUp} className="mt-3 text-base text-slate-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                                    {t('hero_desc')}
                                </motion.p>
                                <motion.div variants={fadeInUp} className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                                    {!user ? (
                                        <>
                                            <div className="rounded-md shadow">
                                                <Link
                                                    to="/register"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                                                >
                                                    {t('get_started')}
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Link>
                                            </div>
                                            <div className="mt-3 sm:mt-0">
                                                <Link
                                                    to="/login"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                                                >
                                                    {t('log_in')}
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="rounded-md shadow">
                                            <Link
                                                to={user.role === 'worker' ? '/worker-dashboard' : user.role === 'employer' ? '/employer-dashboard' : '/officer-dashboard'}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                                            >
                                                {t('go_to_dashboard')} <ArrowUpRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        </main>
                    </div>
                </div>

                {/* Hero Image / Illustration Area */}
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 overflow-hidden pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-full w-full flex items-center justify-center p-12"
                    >
                        <div className="grid grid-cols-2 gap-6 p-8 transform rotate-[-6deg] scale-90 lg:scale-100">
                            {[0, 1, 2, 3].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                                    className="h-48 w-48 rounded-3xl bg-white/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20 flex items-center justify-center group hover:bg-white/60 transition-colors duration-500"
                                >
                                    {i === 0 && <Users className="h-16 w-16 text-blue-500/80 group-hover:text-blue-600 transition-colors" />}
                                    {i === 1 && <Globe className="h-16 w-16 text-indigo-500/80 group-hover:text-indigo-600 transition-colors" />}
                                    {i === 2 && <Shield className="h-16 w-16 text-teal-500/80 group-hover:text-teal-600 transition-colors" />}
                                    {i === 3 && <Building2 className="h-16 w-16 text-slate-500/80 group-hover:text-slate-600 transition-colors" />}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-24 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:text-center mb-16"
                    >
                        <h2 className="text-base text-blue-600 font-bold tracking-wide uppercase mb-2">{t('features_title')}</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            {t('features_subtitle')}
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                            {t('features_desc')}
                        </p>
                    </motion.div>

                    <div className="mt-16">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {[
                                {
                                    name: t('for_workers'),
                                    description: t('for_workers_desc'),
                                    icon: HardHat,
                                    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
                                    shadow: 'shadow-blue-200',
                                },
                                {
                                    name: t('for_employers'),
                                    description: t('for_employers_desc'),
                                    icon: Building2,
                                    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
                                    shadow: 'shadow-indigo-200',
                                },
                                {
                                    name: t('gov_support'),
                                    description: t('gov_support_desc'),
                                    icon: BadgeCheck,
                                    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
                                    shadow: 'shadow-teal-200',
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="relative p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                                        <dt>
                                            <div className={cn("relative flex items-center justify-center h-14 w-14 rounded-2xl text-white shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300", feature.color)}>
                                                <feature.icon className="h-7 w-7" aria-hidden="true" />
                                            </div>
                                            <p className="text-xl leading-6 font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{feature.name}</p>
                                        </dt>
                                        <dd className="mt-4 text-base text-slate-600 leading-relaxed font-medium">
                                            {feature.description}
                                        </dd>
                                        <div className="mt-8 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Stats/Trust Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] mix-blend-overlay"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('trusted_by')}
                        </h2>
                        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-light">
                            {t('trusted_desc')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { label: t('workers_registered'), value: '100k+', icon: Users, delay: 0 },
                            { label: t('jobs_posted'), value: '50k+', icon: Building2, delay: 0.1 },
                            { label: t('districts_covered'), value: '500+', icon: Globe, delay: 0.2 },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: stat.delay
                                }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:bg-blue-400/30 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center h-full hover:border-white/20 transition-all duration-300">
                                    <div className="mb-4 p-3 bg-blue-500/20 rounded-full text-blue-300 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <stat.icon className="w-8 h-8" />
                                    </div>
                                    <dd className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                        {stat.value}
                                    </dd>
                                    <dt className="text-sm md:text-base font-medium text-blue-200/70 uppercase tracking-wider">
                                        {stat.label}
                                    </dt>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-200/60 font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            Live data updated daily
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 border-t border-slate-900/50">
                <div className="max-w-[1920px] mx-auto py-16 px-6 sm:px-12 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <Link to="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/30 transition-all duration-300">
                                    PS
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">PravasiSetu</span>
                            </Link>
                            <p className="text-sm leading-relaxed max-w-xs text-slate-400/90">
                                {t('footer_desc')}
                            </p>
                            <div className="flex space-x-4 pt-2">
                                {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                                        aria-label={social}
                                    >
                                        <div className="h-5 w-5 bg-current rounded-sm" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Columns */}
                        {[
                            { title: t('quick_links'), links: [t('find_job'), t('hire_workers'), t('gov_schemes')] },
                            { title: t('support'), links: [t('help_center'), t('worker_safety'), t('contact_us')] },
                            { title: t('legal'), links: [t('privacy_policy'), t('terms_of_service'), t('grievance_redressal')] }
                        ].map((column) => (
                            <div key={column.title}>
                                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
                                    {column.title}
                                </h4>
                                <ul className="space-y-4 text-sm">
                                    {column.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="group flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 group-hover:w-2.5 transition-all duration-300" />
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm">
                        <p className="text-slate-500">&copy; 2025 PravasiSetu. {t('rights_reserved')}</p>
                        <p className="mt-4 md:mt-0 flex items-center gap-2 text-slate-500">
                            Made with <span className="text-red-500 animate-pulse">♥</span> for India
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
