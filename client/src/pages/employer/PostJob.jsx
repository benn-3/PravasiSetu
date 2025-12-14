import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../store/jobSlice';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { NativeSelect } from "../../components/ui/select"
import { Loader2, Send, MapPin, IndianRupee } from 'lucide-react';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requiredSkills: '',
        amount: '',
        period: 'daily',
        address: '',
        lat: '',
        lng: ''
    });

    const { title, description, requiredSkills, amount, period, address, lat, lng } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.jobs);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSelectChange = (value) => {
        setFormData(prev => ({ ...prev, period: value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            title,
            description,
            requiredSkills: requiredSkills.split(',').map(s => s.trim()),
            salary: { amount, period },
            location: {
                address,
                coordinates: [parseFloat(lng) || 0, parseFloat(lat) || 0]
            }
        };
        dispatch(createJob(jobData));
        navigate('/employer-dashboard');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h2 className="text-xl font-semibold">Publishing Job...</h2>
                <p className="text-slate-500">Please wait while we post your job listing.</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Post a New Job</h1>
                <p className="text-slate-500 mt-1">Fill in the details to find the perfect worker.</p>
            </div>

            <form onSubmit={onSubmit}>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                        <CardDescription>
                            Provide clear and accurate information to attract the right candidates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={title}
                                onChange={onChange}
                                placeholder="e.g. Skilled Carpenter Needed for Home Renovation"
                                required
                                className="text-lg"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={onChange}
                                placeholder="Describe the work, requirements, and timing..."
                                required
                                className="min-h-[120px]"
                            />
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                            <Label htmlFor="requiredSkills">Required Skills</Label>
                            <Input
                                id="requiredSkills"
                                name="requiredSkills"
                                value={requiredSkills}
                                onChange={onChange}
                                placeholder="e.g. Plumbing, Electrician, Hindi Speaking"
                            />
                            <p className="text-xs text-muted-foreground">Comma separated values</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Salary */}
                            <div className="space-y-2">
                                <Label htmlFor="amount">Salary / Rate (₹)</Label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                    <Input
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={amount}
                                        onChange={onChange}
                                        className="pl-9"
                                        placeholder="500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Period */}
                            <div className="space-y-2">
                                <Label htmlFor="period">Payment Period</Label>
                                <NativeSelect
                                    name="period"
                                    value={period}
                                    onChange={(e) => onSelectChange(e.target.value)}
                                >
                                    <option value="daily">Daily</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="project">Fixed Price (Project)</option>
                                </NativeSelect>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Location Details
                            </h3>

                            <div className="space-y-2">
                                <Label htmlFor="address">Full Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={onChange}
                                    placeholder="Site address or location"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lat">Latitude (Optional)</Label>
                                    <Input
                                        id="lat"
                                        name="lat"
                                        value={lat}
                                        onChange={onChange}
                                        placeholder="12.9716"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lng">Longitude (Optional)</Label>
                                    <Input
                                        id="lng"
                                        name="lng"
                                        value={lng}
                                        onChange={onChange}
                                        placeholder="77.5946"
                                    />
                                </div>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="bg-slate-50 flex justify-end gap-3 p-6">
                        <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="submit" size="lg" className="px-8">
                            <Send className="mr-2 h-4 w-4" />
                            Post Job
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default PostJob;
