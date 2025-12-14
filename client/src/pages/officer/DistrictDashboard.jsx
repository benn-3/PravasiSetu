import { useEffect, useState } from 'react';
import analyticsService from '../../services/analyticsService';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Users, Building2, Briefcase, TrendingUp } from 'lucide-react';

const DistrictDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await analyticsService.getStats();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">District Overview</h1>
                <p className="text-slate-500 mt-1">
                    Real-time analytics and statistics for your jurisdiction.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Workers</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.workers}</div>
                        <p className="text-xs text-slate-500 mt-1">
                            Registered in district
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Active Employers</CardTitle>
                        <Building2 className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.employers}</div>
                        <p className="text-xs text-slate-500 mt-1">
                            Posting jobs
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Open Opportunities</CardTitle>
                        <Briefcase className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.activeJobs}</div>
                        <p className="text-xs text-slate-500 mt-1">
                            Jobs currently available
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 text-center">
                <TrendingUp className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900">More analytics coming soon...</h3>
                <p className="text-sm text-slate-500">
                    Migration heatmaps and detailed demographic breakdowns are being processed.
                </p>
            </div>
        </div>
    );
};

export default DistrictDashboard;
