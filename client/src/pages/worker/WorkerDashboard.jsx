import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorkerProfile } from '../../store/workerSlice';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import {
    Briefcase,
    User,
    Calendar,
    CheckCircle,
    AlertCircle,
    MapPin,
    ArrowRight
} from 'lucide-react';

const WorkerDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { profile, isLoading } = useSelector((state) => state.worker);

    useEffect(() => {
        dispatch(getWorkerProfile());
    }, [dispatch]);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Hello, {user?.name}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Here's your daily activity summary for {currentDate}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={profile?.isAvailable ? "success" : "secondary"} className="text-sm py-1 px-3">
                        {profile?.isAvailable ? "Available for Work" : "Not Available"}
                    </Badge>
                </div>
            </div>

            {/* Profile Alert (if not complete) */}
            {!profile && (
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6 flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-yellow-900">Complete Your Profile</h3>
                            <p className="text-yellow-800 mt-1">
                                You need to complete your skills profile to start receiving job matches.
                            </p>
                            <Button asChild className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
                                <Link to="/skill-profile">Complete Profile Now</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{profile ? '12' : '0'}</div> {/* Mock data for matches */}
                        <p className="text-xs text-muted-foreground">
                            +2 new jobs since yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Work History</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{profile?.experience?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Jobs completed successfully
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile Score</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{profile ? '85%' : '20%'}</div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                            <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: profile ? '85%' : '20%' }}
                            ></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>My Skills</CardTitle>
                        <CardDescription>
                            Skills you have listed in your profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {profile?.skills && profile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No skills added yet.</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                            <Link to="/skill-profile">Manage Skills</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common tasks you might want to perform
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link
                            to="/job-matches"
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Find New Jobs</h4>
                                    <p className="text-xs text-muted-foreground">Browse jobs matching your skills</p>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                        </Link>

                        <Link
                            to="/skill-profile"
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Update Profile</h4>
                                    <p className="text-xs text-muted-foreground">Edit personal info & skills</p>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WorkerDashboard;
