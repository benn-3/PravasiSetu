import { useSelector } from 'react-redux';

const WorkHistory = () => {
    const { profile } = useSelector((state) => state.worker);

    if (!profile || !profile.experience || profile.experience.length === 0) {
        return (
            <div className="container">
                <h1>Work History</h1>
                <p>No work history added yet.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Work History</h1>
            <ul className="list-group">
                {profile.experience.map((exp, index) => (
                    <li key={index} className="list-item">
                        <h3>{exp.title} at {exp.company}</h3>
                        <p>{new Date(exp.from).toLocaleDateString()} - {exp.to ? new Date(exp.to).toLocaleDateString() : 'Present'}</p>
                        <p>{exp.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkHistory;
