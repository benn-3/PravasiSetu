import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../store/jobSlice';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requiredSkills: '',
        amount: '',
        period: 'daily',
        address: '',
        lat: '', // Simplified for now, should use map picker
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

    if (isLoading) return <div>Posting...</div>;

    return (
        <div className="container">
            <h1>Post a New Job</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" name="title" value={title} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={description} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Required Skills (comma separated)</label>
                    <input type="text" name="requiredSkills" value={requiredSkills} onChange={onChange} placeholder="e.g. Plumbing, Electrician" />
                </div>
                <div className="form-group">
                    <label>Salary Amount (₹)</label>
                    <input type="number" name="amount" value={amount} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Salary Period</label>
                    <select name="period" value={period} onChange={onChange}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="project">Project</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={address} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Location (Lat/Lng) - <i>(Ideally use a map here)</i></label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" name="lat" value={lat} onChange={onChange} placeholder="Latitude" />
                        <input type="text" name="lng" value={lng} onChange={onChange} placeholder="Longitude" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;
