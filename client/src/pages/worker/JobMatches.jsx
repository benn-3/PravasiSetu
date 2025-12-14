import { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
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
import { MapPin, IndianRupee, Briefcase, Building } from 'lucide-react';

const JobMatches = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobService.getJobs();
                setJobs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const onApply = async (jobId) => {
        try {
            await jobService.applyForJob(jobId);
            alert('Applied Successfully!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error applying to job');
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-48" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recommended Jobs</h1>
                    <p className="text-slate-500 mt-1">Jobs matched to your skills profile.</p>
                </div>
                <Badge variant="outline" className="px-3 py-1">
                    {jobs.length} Matches Found
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <Card key={job._id} className="flex flex-col hover:shadow-md transition-all duration-200 border-slate-200">
                        <CardHeader>
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <CardTitle className="text-lg font-semibold line-clamp-1" title={job.title}>
                                        {job.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center mt-1">
                                        <Building className="h-3 w-3 mr-1" />
                                        {job.employerName || 'Verified Employer'}
                                    </CardDescription>
                                </div>
                                <Badge variant={job.status === 'open' ? 'default' : 'secondary'} className="capitalize">
                                    {job.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <p className="text-sm text-slate-600 line-clamp-2">
                                {job.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center text-slate-700 bg-slate-50 p-2 rounded">
                                    <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
                                    <span className="font-medium">{job.salary?.amount}</span>
                                    <span className="text-xs text-slate-500 ml-1">/{job.salary?.period}</span>
                                </div>
                                <div className="flex items-center text-slate-700 bg-slate-50 p-2 rounded">
                                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                                    <span className="truncate" title={job.location?.address}>
                                        {job.location?.address || 'Remote'}
                                    </span>
                                </div>
                            </div>

                            {job.requiredSkills && job.requiredSkills.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {job.requiredSkills.slice(0, 3).map((skill, i) => (
                                        <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {job.requiredSkills.length > 3 && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                            +{job.requiredSkills.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pt-2">
                            <Button className="w-full" onClick={() => onApply(job._id)}>
                                Apply Now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {jobs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                    <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
                    <p className="text-slate-500">Try updating your skills profile to see more matches.</p>
                </div>
            )}
        </div>
    );
};

export default JobMatches;
