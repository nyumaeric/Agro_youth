import React, { useState } from 'react';
import { verifyCertificate } from '../services/courseService';

interface VerificationResult {
  valid: boolean;
  certificate_id?: string;
  student_name?: string;
  course_title?: string;
  issue_date?: string;
  issuer?: string;
  message?: string;
}

const CertificateVerification: React.FC = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateId || !verificationCode) {
      alert('Please enter both Certificate ID and Verification Code');
      return;
    }

    try {
      setLoading(true);
      const result = await verifyCertificate(certificateId, verificationCode);
      setVerificationResult(result);
    } catch (error: any) {
      console.error('Verification failed:', error);
      setVerificationResult({
        valid: false,
        message: error.response?.data?.error || 'Verification failed'
      });
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

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-800 mb-4">
            Certificate Verification
          </h1>
          <p className="text-lg text-primary-600">
            Verify the authenticity of Agro Youth certificates
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                placeholder="e.g., AGRO-A1B2C3D4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: AGRO-XXXXXXXX (8 characters after AGRO-)
              </p>
            </div>

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code from certificate"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verify Certificate</span>
                </>
              )}
            </button>
          </form>

          {/* Verification Result */}
          {verificationResult && (
            <div className="mt-8 p-6 rounded-lg border-2 border-dashed">
              {verificationResult.valid ? (
                <div className="border-green-300 bg-green-50">
                  <div className="flex items-center mb-4">
                    <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-bold text-green-800">✅ Certificate Verified</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-green-700">Student Name:</p>
                      <p className="text-green-800">{verificationResult.student_name}</p>
                    </div>
                    <div>
                      <p className="font-medium text-green-700">Course:</p>
                      <p className="text-green-800">{verificationResult.course_title}</p>
                    </div>
                    <div>
                      <p className="font-medium text-green-700">Issue Date:</p>
                      <p className="text-green-800">{verificationResult.issue_date ? formatDate(verificationResult.issue_date) : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-green-700">Issued By:</p>
                      <p className="text-green-800">{verificationResult.issuer}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-red-300 bg-red-50">
                  <div className="flex items-center mb-4">
                    <svg className="w-8 h-8 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-bold text-red-800">❌ Certificate Invalid</h3>
                  </div>
                  <p className="text-red-700">
                    {verificationResult.message || 'The certificate could not be verified. Please check the Certificate ID and Verification Code.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How to verify a certificate:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Locate the Certificate ID on the certificate (format: AGRO-XXXXXXXX)</li>
            <li>Find the Verification Code at the bottom of the certificate</li>
            <li>Enter both values in the form above</li>
            <li>Click "Verify Certificate" to check authenticity</li>
          </ol>
          <p className="text-sm text-blue-600 mt-3">
            <strong>Note:</strong> Only valid certificates issued by Agro Youth Platform can be verified through this system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
