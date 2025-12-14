import { useSelector } from 'react-redux';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Calendar, Building2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const WorkHistory = () => {
    const { profile } = useSelector((state) => state.worker);

    if (!profile || !profile.experience || profile.experience.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">No work history found</h2>
                <p className="text-slate-500 max-w-sm mx-auto mt-2">
                    Your completed jobs and Verified work experience will appear here.
                </p>
                <div className="mt-6">
                    <Button variant="outline" asChild>
                        <Link to="/job-matches">Find Jobs</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Work History</h1>
                <p className="text-slate-500">Your professional timeline and completed projects.</p>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {profile.experience.map((exp, index) => (
                    <Card key={index} className="relative transition-all hover:shadow-md border-l-4 border-l-blue-500 ml-8 md:ml-0">
                        {/* Timeline dot */}
                        <div className="absolute top-6 -left-[2.35rem] w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10"></div>

                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <CardTitle className="text-lg font-bold">{exp.title}</CardTitle>
                                    <CardDescription className="flex items-center mt-1 font-medium text-slate-700">
                                        <Building2 className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                        {exp.company}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="w-fit flex items-center gap-1.5 py-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(exp.from).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                    {' - '}
                                    {exp.to ? new Date(exp.to).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {exp.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default WorkHistory;
