import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyCertificates } from '../services/courseService';

interface Certificate {
  certificate_id: string;
  course_title: string;
  course_category: string;
  course_level: string;
  issue_date: string;
  certificate_url: string;
}

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await getMyCertificates();
      setCertificates(data);
    } catch (error: any) {
      console.error('Error loading certificates:', error);
      setError(error.response?.data?.error || 'Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Crop Production': return '🌾';
      case 'Livestock': return '🐄';
      case 'Sustainable Agriculture': return '🌱';
      case 'Agribusiness': return '💼';
      default: return '📜';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your certificates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-800 mb-4">
            My Certificates
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Your agricultural education achievements and certifications
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Certificates Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Complete courses to earn certificates and showcase your agricultural expertise.
            </p>
            <Link
              to="/courses"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Browse Courses</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">{certificates.length}</div>
                    <div className="text-sm text-gray-600">Total Certificates</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {new Set(certificates.map(c => c.course_category)).size}
                    </div>
                    <div className="text-sm text-gray-600">Categories Mastered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">
                      {certificates.filter(c => c.course_level === 'Advanced').length}
                    </div>
                    <div className="text-sm text-gray-600">Advanced Certifications</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <div
                  key={certificate.certificate_id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Certificate Header */}
                  <div className="h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Certificate
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getLevelColor(certificate.course_level)}`}>
                        {certificate.course_level}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getCategoryIcon(certificate.course_category)}</span>
                        <span className="bg-white bg-opacity-90 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          {certificate.course_category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">
                      {certificate.course_title}
                    </h3>
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Certificate ID:</span>
                        <span className="font-mono text-gray-800 text-xs">{certificate.certificate_id}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Issued:</span>
                        <span className="text-gray-800">{formatDate(certificate.issue_date)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/certificate/${certificate.certificate_id}`}
                        className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-2.5 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span>View</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/verify/${certificate.certificate_id}`);
                          alert('Verification link copied to clipboard!');
                        }}
                        className="bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center"
                        title="Copy verification link"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Certificate Actions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Earn More Certificates</span>
              </Link>
              
              <Link
                to="/verify"
                className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors font-medium inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verify Certificate</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
