import api from './api';

export const courseService = {
  // Get all courses
  getCourses: async (filters?: any) => {
    const response = await api.get('/courses', { params: filters });
    return response.data;
  },

  // Get single course
  getCourse: async (courseId: string) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  // Get user's enrolled courses
  getMyCourses: async () => {
    const response = await api.get('/my-courses');
    return response.data;
  },

  // Enroll in course
  enrollCourse: async (courseId: string) => {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  // Update progress
  updateProgress: async (enrollmentId: string, moduleNumber: number) => {
    const response = await api.put(`/enrollments/${enrollmentId}/progress`, {
      module_number: moduleNumber
    });
    return response.data;
  },

  // Generate certificate
  generateCertificate: async (enrollmentId: string) => {
    const response = await api.post(`/enrollments/${enrollmentId}/certificate`);
    return response.data;
  },

  // Complete course (automatically generates certificate)
  completeCourse: async (enrollmentId: string) => {
    const response = await api.post(`/enrollments/${enrollmentId}/complete`);
    return response.data;
  },

  // Get certificate by ID
  getCertificate: async (certificateId: string) => {
    const response = await api.get(`/certificates/${certificateId}`);
    return response.data;
  },

  // Get user's certificates
  getMyCertificates: async () => {
    const response = await api.get('/my-certificates');
    return response.data;
  },

  // Verify certificate
  verifyCertificate: async (certificateId: string, verificationCode: string) => {
    const response = await api.post(`/certificates/${certificateId}/verify`, {
      verification_code: verificationCode
    });
    return response.data;
  },

  // Get enrollment status and progress
  getEnrollmentStatus: async (enrollmentId: string) => {
    const response = await api.get(`/enrollments/${enrollmentId}/status`);
    return response.data;
  }
};

export default courseService;

// Named exports for individual functions
export const {
  getCourses,
  getCourse,
  getMyCourses,
  enrollCourse,
  updateProgress,
  generateCertificate,
  completeCourse,
  getCertificate,
  getMyCertificates,
  verifyCertificate,
  getEnrollmentStatus
} = courseService;