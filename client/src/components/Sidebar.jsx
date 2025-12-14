import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cn } from '../lib/utils';
import {
    LayoutDashboard,
    User,
    Briefcase,
    History,
    PlusCircle,
    Users,
    CheckSquare,
    Map,
    BarChart3,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    const NavItem = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
                    isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
            >
                <Icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-slate-500 group-hover:text-slate-900")} />
                {label}
            </Link>
        );
    };

    if (!user) return null;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out",
                !isOpen && "-translate-x-full md:translate-x-0"
            )}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700 tracking-tight">
                            <img src="/logo.png" alt="PravasiSetu Logo" className="h-10 w-auto" />
                            <span>PravasiSetu</span>
                        </Link>
                        <button
                            onClick={toggleSidebar}
                            className="ml-auto md:hidden text-slate-500 hover:text-slate-800"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        <div className="mb-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Menu
                        </div>

                        {user?.role === 'worker' && (
                            <>
                                <NavItem to="/worker-dashboard" icon={LayoutDashboard} label="Dashboard" />
                                <NavItem to="/skill-profile" icon={User} label="My Profile" />
                                <NavItem to="/job-matches" icon={Briefcase} label="Job Matches" />
                                <NavItem to="/work-history" icon={History} label="Work History" />
                            </>
                        )}

                        {user?.role === 'employer' && (
                            <>
                                <NavItem to="/employer-dashboard" icon={LayoutDashboard} label="Dashboard" />
                                <NavItem to="/post-job" icon={PlusCircle} label="Post New Job" />
                                {/* Add placeholder links for future features if needed */}
                            </>
                        )}

                        {user?.role === 'officer' && (
                            <>
                                <NavItem to="/officer-dashboard" icon={LayoutDashboard} label="Dashboard" />
                                <NavItem to="/verification-queue" icon={CheckSquare} label="Verifications" />
                                <NavItem to="/district-dashboard" icon={Map} label="District View" />
                            </>
                        )}

                        {user?.role === 'admin' && (
                            <>
                                <NavItem to="/admin-dashboard" icon={BarChart3} label="Analytics" />
                                <NavItem to="/heatmap" icon={Map} label="Migration Map" />
                            </>
                        )}
                    </div>

                    {/* Footer User Info */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {user.name?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                    {user.name || 'User'}
                                </p>
                                <p className="text-xs text-slate-500 capitalize truncate">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
