import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkerProfile, getWorkerProfile } from '../../store/workerSlice';

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
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            skills: skills.split(',').map(skill => skill.trim()),
            dailyRate,
            isAvailable
        };
        dispatch(updateWorkerProfile(profileData));
        alert('Profile Updated Successfully');
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>My Skills & Profile</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={skills}
                        onChange={onChange}
                        placeholder="e.g. Masonry, Plumbing, Carpentry"
                    />
                </div>
                <div className="form-group">
                    <label>Daily Rate (₹)</label>
                    <input
                        type="number"
                        name="dailyRate"
                        value={dailyRate}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={isAvailable}
                            onChange={onChange}
                        />
                        Available for Work
                    </label>
                </div>
                <button type="submit" className="btn">Update Profile</button>
            </form>
        </div>
    );
};

export default SkillProfile;
