import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCertificate, getEnrollmentStatus } from '../services/courseService';

interface CertificateData {
  certificate_id: string;
  course_title: string;
  course_category: string;
  course_level: string;
  course_duration: number;
  student_name: string;
  student_email: string;
  issue_date: string;
  completion_date: string;
  verification_code: string;
  modules_completed: number;
  total_modules: number;
}

const Certificate: React.FC = () => {
  const { enrollmentId, certificateId } = useParams<{ enrollmentId?: string; certificateId?: string }>();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCertificate();
  }, [enrollmentId, certificateId]);

  const loadCertificate = async () => {
    try {
      setLoading(true);
      setError(null);

      if (certificateId) {
        // Load certificate directly by ID
        const data = await getCertificate(certificateId);
        setCertificate(data);
      } else if (enrollmentId) {
        // Get certificate from enrollment status
        const enrollmentData = await getEnrollmentStatus(enrollmentId);
        if (enrollmentData.certificate_id) {
          const data = await getCertificate(enrollmentData.certificate_id);
          setCertificate(data);
        } else {
          setError('Certificate not yet issued for this course');
        }
      } else {
        setError('No certificate or enrollment ID provided');
      }
    } catch (error: any) {
      console.error('Error loading certificate:', error);
      setError(error.response?.data?.error || 'Failed to load certificate');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate PDF or download functionality
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-earth-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-earth-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No certificate data available</p>
        </div>
      </div>
    );
  }    return (
    <div className="min-h-screen bg-earth-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6 space-x-4">
          <button
            onClick={handlePrint}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            <span>Print Certificate</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Download PDF</span>
          </button>
          
          <button
            onClick={() => navigate('/courses')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>

        {/* Certificate Design */}
        <div className="bg-white border-8 border-secondary-400 p-12 shadow-2xl relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-primary-600"></div>
          
          <div className="text-center">
            {/* Header */}
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Agro Youth" 
                className="h-16 mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold text-primary-800 mb-2">
                Certificate of Completion
              </h1>
              <p className="text-lg text-primary-600">
                This is to certify that
              </p>
            </div>

            {/* Recipient Name */}
            <div className="my-8">
              <h2 className="text-5xl font-bold text-primary-900 mb-4 border-b-4 border-primary-300 pb-4">
                {certificate.student_name || 'Student Name'}
              </h2>
              <p className="text-lg text-earth-700">
                has successfully completed the course
              </p>
            </div>

            {/* Course Details */}
            <div className="my-8">
              <h3 className="text-3xl font-semibold text-primary-800 mb-4">
                {certificate.course_title}
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <p className="text-sm text-primary-600 font-medium">Category</p>
                  <p className="text-lg font-semibold text-primary-800">{certificate.course_category}</p>
                </div>
                <div className="bg-primary-50 p-3 rounded-lg">
                  <p className="text-sm text-primary-600 font-medium">Level</p>
                  <p className="text-lg font-semibold text-primary-800">{certificate.course_level}</p>
                </div>
                <div className="bg-primary-50 p-3 rounded-lg">
                  <p className="text-sm text-primary-600 font-medium">Duration</p>
                  <p className="text-lg font-semibold text-primary-800">{certificate.course_duration} hours</p>
                </div>
              </div>
              <p className="text-lg text-earth-600 mb-2">
                with dedication and commitment to agricultural excellence
              </p>
              <p className="text-sm text-earth-500">
                Completed {certificate.modules_completed} of {certificate.total_modules} modules
              </p>
            </div>

            {/* Date and Signatures */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="border-t-2 border-primary-600 pt-2 mt-16">
                  <p className="text-sm text-earth-700">Date Completed</p>
                  <p className="font-semibold text-primary-800">
                    {formatDate(certificate.completion_date)}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-primary-600 pt-2 mt-16">
                  <p className="text-sm text-earth-700">Date Issued</p>
                  <p className="font-semibold text-primary-800">
                    {formatDate(certificate.issue_date)}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-primary-600 pt-2 mt-16">
                  <p className="text-sm text-earth-700">Certificate ID</p>
                  <p className="font-semibold text-primary-800 text-sm">
                    {certificate.certificate_id}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="mt-8 pt-4 border-t border-earth-300 bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-earth-600 mb-2">
                  <strong>Verify this certificate online:</strong>
                </p>
                <p className="text-sm text-primary-600 font-mono mb-2">
                  https://agroyouth.com/verify/{certificate.certificate_id}
                </p>
                <p className="text-xs text-earth-500">
                  Verification Code: <span className="font-mono font-semibold">{certificate.verification_code}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-4xl, .max-w-4xl * {
            visibility: visible;
          }
          .max-w-4xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificate;