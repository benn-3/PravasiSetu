import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../../store/authSlice';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message); // Better error handling later
        }

        if (isSuccess || user) {
            if (user.role === 'worker') navigate('/worker-dashboard');
            else if (user.role === 'employer') navigate('/employer-dashboard');
            else if (user.role === 'officer') navigate('/officer-dashboard');
            else if (user.role === 'admin') navigate('/admin-dashboard');
            else navigate('/');
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
        const userData = { email, password };
        dispatch(login(userData));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <span>PravasiSetu</span>
                    </div>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">
                        Don't have an account? <Link to="/register">Register Now</Link>
                    </p>
                </div>

                <form className="auth-form" onSubmit={onSubmit}>
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
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember Me
                        </label>
                        <Link to="#" className="forgot-password">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="auth-btn">
                        {isLoading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        By logging in, you agree to our
                        <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
