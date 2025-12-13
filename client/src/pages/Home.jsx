import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1>Welcome to <span className="highlight">PravasiSetu</span></h1>
                    <p className="subtitle">Bridging the gap for migrant workers. Find jobs, secure your future, and grow with confidence.</p>
                    <div className="hero-buttons">
                        {!user ? (
                            <>
                                <Link to="/register" className="btn btn-lg btn-primary">Get Started</Link>
                                <Link to="/login" className="btn btn-lg btn-outline">Login</Link>
                            </>
                        ) : (
                            <Link to={user.role === 'worker' ? '/worker-dashboard' : '/employer-dashboard'} className="btn btn-lg btn-primary">Go to Dashboard</Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="features">
                <h2>Why Choose PravasiSetu?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="icon">👷</div>
                        <h3>For Workers</h3>
                        <p>Find verified job opportunities based on your skills and location. Secure payments and insurance support.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">🏢</div>
                        <h3>For Employers</h3>
                        <p>Hire skilled labor instantly. Verify worker credentials and track work history with ease.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">👮</div>
                        <h3>Government Support</h3>
                        <p>Verified by local authorities. Get access to government schemes and migration support.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta">
                <h2>Ready to Start Your Journey?</h2>
                <p>Join thousands of workers and employers on India's most trusted migration platform.</p>
                {!user && <Link to="/register" className="btn btn-lg btn-white">Join Now</Link>}
            </section>

            <footer className="footer">
                <p>&copy; 2024 PravasiSetu. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
