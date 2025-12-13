import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../store/authSlice';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'worker', // Default role
    });
    const { name, email, password, role } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { name, email, password, role };
        dispatch(register(userData));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span>PravasiSetu</span>
                    </div>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>

                <form className="auth-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <div className="form-input-wrapper">
                            <input
                                type="text"
                                className="form-input"
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="Your full name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="form-input-wrapper">
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-input-wrapper">
                            <input
                                type="password"
                                className="form-input"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Create a strong password"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="role">I am a...</label>
                        <div className="form-input-wrapper">
                            <select
                                className="form-input"
                                name="role"
                                value={role}
                                onChange={onChange}
                            >
                                <option value="worker">Worker (Migrant)</option>
                                <option value="employer">Employer</option>
                                <option value="officer">Government Officer</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn">
                        {isLoading ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        By registering, you agree to our <Link to="#">Terms</Link> and <Link to="#">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
