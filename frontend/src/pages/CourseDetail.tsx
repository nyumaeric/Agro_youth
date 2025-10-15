import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse, getMyCourses, updateProgress, generateCertificate } from '../services/courseService';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    if (courseId) {
      loadCourse();
      loadEnrollment();
    }
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const data = await getCourse(courseId!);
      setCourse(data);
    } catch (error) {
      console.error('Error loading course:', error);
    }
  };

  const loadEnrollment = async () => {
    try {
      const myCourses = await getMyCourses();
      const currentEnrollment = myCourses.find((ec: any) => ec.course_id === courseId);
      setEnrollment(currentEnrollment);
    } catch (error) {
      console.error('Error loading enrollment:', error);
    }
  };

  const markModuleComplete = async (moduleNumber: number) => {
    try {
      await updateProgress(enrollment.enrollment_id, moduleNumber);
      loadEnrollment();
      alert('Module marked as completed!');
    } catch (error) {
      alert('Error updating progress');
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      const result = await generateCertificate(enrollment.enrollment_id);
      alert('Certificate generated successfully!');
      // Redirect to certificate page
      window.location.href = `/certificate/${enrollment.enrollment_id}`;
    } catch (error) {
      alert('Error generating certificate');
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const isModuleCompleted = (moduleNumber: number) => {
    return enrollment?.progress.some((p: any) => p.module_number === moduleNumber);
  };

  const allModulesCompleted = enrollment && 
    enrollment.progress.length === course.modules.length;

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary-800 mb-4">{course.title}</h1>
          <p className="text-primary-600 mb-4">{course.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary-800">{course.level}</div>
              <div className="text-sm text-primary-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary-800">{course.duration_hours}h</div>
              <div className="text-sm text-primary-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary-800">{course.modules.length}</div>
              <div className="text-sm text-primary-600">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary-800">{course.language}</div>
              <div className="text-sm text-primary-600">Language</div>
            </div>
          </div>

          {enrollment && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-primary-800 font-semibold">Progress</span>
                <span className="text-primary-600">
                  {enrollment.progress.length} of {course.modules.length} modules
                </span>
              </div>
              <div className="w-full bg-primary-200 rounded-full h-3">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(enrollment.progress.length / course.modules.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}

          {allModulesCompleted && !enrollment.certificate_issued && (
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-secondary-700">
                    You've completed all modules! Generate your certificate now.
                  </p>
                </div>
                <button
                  onClick={handleGenerateCertificate}
                  className="bg-secondary-500 text-white px-6 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
                >
                  Get Certificate
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">Course Modules</h3>
              <div className="space-y-2">
                {course.modules.map((module: any, index: number) => (
                  <button
                    key={module.module_number}
                    onClick={() => setActiveModule(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeModule === index
                        ? 'bg-primary-100 border-l-4 border-primary-500'
                        : 'hover:bg-primary-50'
                    } ${
                      isModuleCompleted(module.module_number) ? 'text-primary-700' : 'text-primary-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Module {module.module_number}</span>
                      {isModuleCompleted(module.module_number) && (
                        <span className="text-primary-500">✓</span>
                      )}
                    </div>
                    <div className="text-sm opacity-75">{module.title}</div>
                    <div className="text-xs text-primary-600 mt-1">
                      {module.duration_minutes} min
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {course.modules[activeModule] && (
                <>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">
                    Module {course.modules[activeModule].module_number}: {course.modules[activeModule].title}
                  </h2>
                  
                  <div className="prose max-w-none mb-6">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: course.modules[activeModule].content 
                      }} 
                    />
                  </div>

                  {course.modules[activeModule].video_url && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">Video Lesson</h3>
                      <div className="aspect-w-16 aspect-h-9">
                        <video 
                          controls 
                          className="w-full rounded-lg"
                          src={course.modules[activeModule].video_url}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )}

                  {enrollment && !isModuleCompleted(course.modules[activeModule].module_number) && (
                    <button
                      onClick={() => markModuleComplete(course.modules[activeModule].module_number)}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}

                  {isModuleCompleted(course.modules[activeModule].module_number) && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-primary-500 text-xl mr-2">✓</span>
                        <span className="text-primary-800 font-semibold">
                          Module completed on {new Date(
                            enrollment.progress.find((p: any) => 
                              p.module_number === course.modules[activeModule].module_number
                            ).completed_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;