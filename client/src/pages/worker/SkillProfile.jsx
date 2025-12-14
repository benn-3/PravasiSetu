import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkerProfile, getWorkerProfile } from '../../store/workerSlice';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Loader2, Save, UserCog, Briefcase } from 'lucide-react';

const SkillProfile = () => {
    const dispatch = useDispatch();
    const { profile, isLoading } = useSelector((state) => state.worker);

    const [formData, setFormData] = useState({
        skills: '',
        dailyRate: '',
        isAvailable: true,
        experience: []
    });

    useEffect(() => {
        dispatch(getWorkerProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                skills: profile.skills ? profile.skills.join(', ') : '',
                dailyRate: profile.dailyRate || '',
                isAvailable: profile.isAvailable,
                experience: profile.experience || []
            });
        }
    }, [profile]);

    const { skills, dailyRate, isAvailable } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onCheckboxChange = (checked) => {
        setFormData((prevState) => ({
            ...prevState,
            isAvailable: checked,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            skills: skills.split(',').map(skill => skill.trim()).filter(s => s),
            dailyRate,
            isAvailable
        };
        dispatch(updateWorkerProfile(profileData));
        // You might want to use a toast notification here instead of alert
        alert('Profile Updated Successfully');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <UserCog className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Skill Profile
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Manage your professional skills and availability.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                    <CardDescription>
                        Update your skills and rates to get better job matches.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={skills}
                                onChange={onChange}
                                placeholder="e.g. Masonry, Plumbing, Carpentry"
                                className="bg-slate-50 border-slate-200"
                            />
                            <p className="text-xs text-muted-foreground">
                                Separate multiple skills with commas.
                            </p>
                            {skills && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {skills.split(',').map((skill, index) => (
                                        skill.trim() && (
                                            <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs">
                                                {skill.trim()}
                                            </Badge>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="dailyRate">Daily Rate (₹)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-500">₹</span>
                                    <Input
                                        id="dailyRate"
                                        type="number"
                                        name="dailyRate"
                                        value={dailyRate}
                                        onChange={onChange}
                                        className="pl-7 bg-slate-50 border-slate-200"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="flex items-end pb-2">
                                <div className="flex items-center space-x-2 border p-3 rounded-md w-full bg-slate-50/50">
                                    <Checkbox
                                        id="isAvailable"
                                        checked={isAvailable}
                                        onCheckedChange={onCheckboxChange}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <Label
                                            htmlFor="isAvailable"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Available for Work
                                        </Label>
                                        <p className="text-[0.8rem] text-muted-foreground">
                                            Show profile to employers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full md:w-auto">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SkillProfile;
