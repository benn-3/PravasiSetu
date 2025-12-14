import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../store/authSlice';
import { Loader2, User, Mail, Lock, Phone, HardHat, Building2, BadgeCheck, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

const Register = () => {
    const [activeTab, setActiveTab] = useState('worker');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const { name, email, phone, password, confirmPassword } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const userData = {
            name,
            email,
            phone,
            password,
            role: activeTab,
        };

        dispatch(register(userData));
    };

    // Role Configuration
    const roles = [
        { id: 'worker', label: 'Worker', emoji: '👷', icon: HardHat, color: 'blue' },
        { id: 'employer', label: 'Employer', emoji: '🏢', icon: Building2, color: 'indigo' },
        { id: 'officer', label: 'Officer', emoji: '👮', icon: BadgeCheck, color: 'emerald' },
    ];

    const activeRoleConfig = roles.find(r => r.id === activeTab);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-l from-blue-600 to-indigo-700 transform skew-y-3 origin-top-right z-0"></div>

            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 relative z-10 transition-all duration-300">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join PravasiSetu today
                    </p>
                </div>

                {/* Role Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setActiveTab(role.id)}
                            className={cn(
                                "flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs font-medium transition-all duration-200",
                                activeTab === role.id
                                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5 scale-[1.02]"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                            )}
                        >
                            <span className="text-xl mb-1 filter drop-shadow-sm">{role.emoji}</span>
                            <span>{role.label}</span>
                        </button>
                    ))}
                </div>

                {/* Dynamic Header based on Role */}
                <div className={cn(
                    "rounded-lg p-4 border border-l-4 flex items-center space-x-3 bg-opacity-50",
                    activeTab === 'worker' ? "bg-blue-50 border-blue-500" :
                        activeTab === 'employer' ? "bg-indigo-50 border-indigo-500" :
                            "bg-emerald-50 border-emerald-500"
                )}>
                    <div className={cn(
                        "p-2 rounded-full",
                        activeTab === 'worker' ? "bg-blue-100 text-blue-600" :
                            activeTab === 'employer' ? "bg-indigo-100 text-indigo-600" :
                                "bg-emerald-100 text-emerald-600"
                    )}>
                        <activeRoleConfig.icon className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                            Register as {activeRoleConfig.label}
                        </h3>
                        <p className="text-xs text-slate-500">
                            Create your {activeRoleConfig.label.toLowerCase()} profile
                        </p>
                    </div>
                </div>

                {isError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-pulse">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Registration Failed</p>
                                <p className="text-sm text-red-700 mt-1">{message}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="group">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                                Full Name
                            </label>
                            <div className="relative rounded-md shadow-sm transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-offset-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={onChange}
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-0 focus:border-transparent p-2.5 outline-none border"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                                Email Address
                            </label>
                            <div className="relative rounded-md shadow-sm transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-offset-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={onChange}
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-0 focus:border-transparent p-2.5 outline-none border"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                                Phone Number
                            </label>
                            <div className="relative rounded-md shadow-sm transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-offset-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    maxLength="10"
                                    value={phone}
                                    onChange={onChange}
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-md focus:ring-0 focus:border-transparent p-2.5 outline-none border"
                                    placeholder="9876543210"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                                Password
                            </label>
                            <div className="relative rounded-md shadow-sm transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-offset-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={onChange}
                                    className="block w-full pl-10 pr-10 sm:text-sm border-slate-300 rounded-md focus:ring-0 focus:border-transparent p-2.5 outline-none border"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <Eye className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative rounded-md shadow-sm transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-offset-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ShieldCheck className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={onChange}
                                    className="block w-full pl-10 pr-10 sm:text-sm border-slate-300 rounded-md focus:ring-0 focus:border-transparent p-2.5 outline-none border"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <Eye className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-4",
                                activeTab === 'worker' ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" :
                                    activeTab === 'employer' ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500" :
                                        "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
                                isLoading && "opacity-75 cursor-not-allowed transform-none hover:shadow-none"
                            )}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
