import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';

const Home: React.FC = () => {
  const token = localStorage.getItem('access_token');

  const features = [
    {
      icon: '🌾',
      title: 'Interactive Courses',
      description: 'Access comprehensive agricultural courses designed for Liberian youth. Learn modern farming techniques, traditional practices, and business skills through hands-on interactive lessons.',
      link: '/courses',
      stats: '50+ Interactive Learning Courses'
    },
    {
      icon: '🛒',
      title: 'Market Connection',
      description: 'Empower young farmers to connect with buyers, access fair markets, and sell their produce digitally. Gain real-time insights to make smarter business decisions.',
      link: '/market',
      stats: '100+ Youth-Led Agri Businesses'
    },
    {
      icon: '🤝',
      title: 'Community Support',
      description: 'Join a growing digital community of young farmers and mentors. Share ideas, access expert guidance, and grow your farming career together.',
      link: token ? '/courses' : '/register',
      stats: '2500+ Active AgroYouth Members'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Young Farmers Empowered' },
    { number: '500+', label: 'Digital Learning Resources' },
    { number: '1,000+', label: 'Agri-Market Opportunities' },
    { number: '50+', label: 'Local Communities Impacted' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="text-gradient">AgroYouth</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-4 font-serif">
                Empowering the Next Generation of Liberian Farmers
              </p>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                Learn, connect, and grow with digital agricultural courses designed for youth.
               Join a vibrant community of young farmers transforming agriculture through technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {token ? (
                  <>
                    <Link to="/courses">
                      <Button variant="primary" size="lg" className="w-full sm:w-auto">
                        Explore Courses 📚
                      </Button>
                    </Link>
                    <Link to="/market">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Browse Market 🛒
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <Button variant="primary" size="lg" className="w-full sm:w-auto">
                        Get Started Free
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50 bg-pattern">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Empowering the Next Generation of Liberian Farmers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             Discover digital tools and resources designed to help young Liberian farmers learn modern techniques, access interactive courses, build stronger farming communities, and connect with markets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow duration-300 animate-slide-up group">
                <Card.Body className="p-8">
                  <div className="text-6xl mb-6 group-hover:animate-bounce-gentle">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-sm text-primary-600 font-medium mb-6">
                    {feature.stats}
                  </div>
                  <Link to={feature.link}>
                    <Button 
                      variant={index === 0 ? 'primary' : 'outline'} 
                      size="sm" 
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Empower Your Farming Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join AgroYouth to learn, connect, and grow. Take interactive courses, access learning resources, and explore market opportunities — all in one platform.
            </p>
            
            {!token && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-600">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-2xl font-bold mb-4">
              <span className="text-3xl">🌾</span>
              <span>AgroYouth</span>
            </div>
            <p className="text-gray-400 mb-8">
              Empowering young Liberian farmers through digital learning, market access, and community collaboration
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">
               Learning Hub
              </Link>
              <Link to="/market" className="text-gray-400 hover:text-white transition-colors">
                Market Access
              </Link>
              {!token && (
                <>
                  <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                    Join
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;