import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyJobs } from '../../store/jobSlice';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import {
    Briefcase,
    Users,
    Plus,
    Search,
    Building2,
    Calendar,
    ArrowRight
} from 'lucide-react';

const EmployerDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { jobs, isLoading } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(getMyJobs());
    }, [dispatch]);

    // Calculate stats
    const totalJobs = jobs ? jobs.length : 0;
    const activeJobs = jobs ? jobs.filter(j => j.status === 'open').length : 0;
    const closedJobs = jobs ? jobs.filter(j => j.status === 'closed').length : 0;

    // Helper to count total applicants (assuming backend provides applicantsCount)
    // If backend doesn't provide it directly on the job object, we'd need to fetch detail or default to 0.
    const totalApplicants = jobs ? jobs.reduce((acc, job) => acc + (job.applicantsCount || 0), 0) : 0;


    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
                <Skeleton className="h-64" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back, {user?.name}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Manage your job postings and find the best talent.
                    </p>
                </div>
                <Button asChild size="lg" className="shadow-md">
                    <Link to="/post-job" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Post New Job
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalJobs}</div>
                        <p className="text-xs text-muted-foreground">
                            {activeJobs} active, {closedJobs} closed
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalApplicants}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all your active listings
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Company Profile</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Verified</div>
                        <p className="text-xs text-muted-foreground">
                            Your account is in good standing
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Jobs List */}
            <Card className="col-span-full">
                <CardHeader>
                    <CardTitle>Recent Job Postings</CardTitle>
                    <CardDescription>
                        A list of your recently posted jobs and their status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {jobs.length === 0 ? (
                        <div className="text-center py-12">
                            <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
                            <h3 className="mt-2 text-sm font-semibold text-slate-900">No jobs posted</h3>
                            <p className="mt-1 text-sm text-slate-500">Get started by creating a new job posting.</p>
                            <div className="mt-6">
                                <Button asChild variant="outline">
                                    <Link to="/post-job">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Post Job
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-slate-50 transition-colors"
                                >
                                    <div className="space-y-1 mb-4 md:mb-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-base">{job.title}</h4>
                                            <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                                                {job.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Posted {new Date(job.createdAt).toLocaleDateString()}
                                            </span>
                                            {/* Assuming job has location or type */}
                                            {job.location && (
                                                <span>• {job.location.address || 'Remote'}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full md:w-auto">
                                        <div className="text-sm mr-4 hidden md:block">
                                            <span className="font-medium">{job.applicantsCount || 0}</span> applicants
                                        </div>
                                        <Button asChild variant="outline" size="sm" className="flex-1 md:flex-none">
                                            <Link to={`/job/${job._id}/applicants`}>\
                                                <Users className="mr-2 h-4 w-4" />
                                                Applicants
                                            </Link>
                                        </Button>
                                        <Button asChild size="sm" className="flex-1 md:flex-none">
                                            <Link to={`/job/${job._id}/matches`}>
                                                <Search className="mr-2 h-4 w-4" />
                                                Find Matches
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployerDashboard;
