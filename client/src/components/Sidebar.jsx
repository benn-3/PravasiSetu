import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);

    if (!isOpen) return null;

    return (
        <div className="sidebar">
            <button className="close-btn" onClick={toggleSidebar}>&times;</button>
            <div className="sidebar-links">
                {user?.role === 'worker' && (
                    <>
                        <Link to="/worker-dashboard" onClick={toggleSidebar}>Dashboard</Link>
                        <Link to="/skill-profile" onClick={toggleSidebar}>Profile</Link>
                        <Link to="/job-matches" onClick={toggleSidebar}>Jobs</Link>
                    </>
                )}
                {user?.role === 'employer' && (
                    <>
                        <Link to="/employer-dashboard" onClick={toggleSidebar}>Dashboard</Link>
                        <Link to="/post-job" onClick={toggleSidebar}>Post Job</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
