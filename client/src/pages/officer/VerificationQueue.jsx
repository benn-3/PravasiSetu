import { useEffect, useState } from 'react';
import workerService from '../../services/workerService';
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
import { ShieldCheck, MapPin, CheckCircle, UserCheck } from 'lucide-react';

const VerificationQueue = () => {
    const [workers, setWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await workerService.getAllWorkers();
                const unverified = data.filter(w => !w.user.isVerified);
                setWorkers(unverified);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkers();
    }, []);

    const onVerify = async (userId) => {
        try {
            await workerService.verifyWorker(userId);
            setWorkers(workers.filter(w => w.user._id !== userId));
            // Could use a toast here
            // alert('Worker Verified'); 
        } catch (error) {
            alert('Verification failed');
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-l-4 border-blue-600 pl-4">
                    Verification Queue
                </h1>
                <p className="text-slate-500 mt-1 pl-4">
                    Review and verify worker identities. ({workers.length} Pending)
                </p>
            </div>

            {workers.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">All caught up!</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mt-2">
                        There are no pending worker verifications at this time.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workers.map(worker => (
                        <Card key={worker._id} className="hover:shadow-md transition-shadow border-t-2 border-t-amber-400">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                                        <UserCheck className="h-5 w-5" />
                                    </div>
                                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Pending</Badge>
                                </div>
                                <CardTitle className="mt-4 text-xl">{worker.user.name}</CardTitle>
                                <CardDescription className="flex items-center">
                                    <MapPin className="h-3.5 w-3.5 mr-1" />
                                    {worker.user.location?.district || 'Unknown District'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                        Skills
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {worker.skills.slice(0, 4).map((skill, i) => (
                                            <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400">
                                    ID: {worker.user._id.slice(-6).toUpperCase()}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 pt-3">
                                <Button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                    onClick={() => onVerify(worker.user._id)}
                                >
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    Verify Identity
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerificationQueue;
