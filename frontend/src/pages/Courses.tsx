import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, getMyCourses, enrollCourse } from '../services/courseService';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  language: string;
  modules: Array<{
    module_number: number;
    title: string;
    duration_minutes: number;
  }>;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    category: '',
    level: '',
    language: ''
  });

  useEffect(() => {
    loadCourses();
    loadMyCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses(filter);
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadMyCourses = async () => {
    try {
      const data = await getMyCourses();
      setMyCourses(data);
    } catch (error) {
      console.error('Error loading my courses:', error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollCourse(courseId);
      alert('Successfully enrolled in course!');
      loadMyCourses();
    } catch (error) {
      alert('Error enrolling in course');
    }
  };

  const isEnrolled = (courseId: string) => {
    return myCourses.some(course => course.course_id === courseId);
  };

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-800 mb-4">
            Agricultural Courses
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Enhance your farming skills with our comprehensive courses and earn certificates upon completion
          </p>
        </div>

        {/* My Courses Section */}
        {myCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary-800 mb-6">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myCourses.map((enrollment) => (
                <div key={enrollment.enrollment_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  {/* Course Header with Progress */}
                  <div className="h-32 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="absolute top-3 left-3">
                      {enrollment.completed ? (
                        <span className="bg-white bg-opacity-90 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="bg-white bg-opacity-90 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Circle */}
                    <div className="absolute top-3 right-3">
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="16" 
                            fill="none" 
                            stroke="white" 
                            strokeWidth="2"
                            strokeDasharray={`${(enrollment.progress.length / enrollment.total_modules) * 100}, 100`}
                            className="transition-all duration-300"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {Math.round((enrollment.progress.length / enrollment.total_modules) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {enrollment.course_title}
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Progress</span>
                        <span className="text-sm text-gray-500">
                          {enrollment.progress.length} of {enrollment.total_modules} modules
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(enrollment.progress.length / enrollment.total_modules) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex space-x-2">
                      {enrollment.completed ? (
                        <>
                          <Link
                            to={`/certificate/${enrollment.enrollment_id}`}
                            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-2.5 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h5a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h5a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                            </svg>
                            <span>Certificate</span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          to={`/course/${enrollment.course_id}`}
                          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-2.5 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Continue Learning</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Courses Section */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-primary-800 mb-6">Available Courses</h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select 
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white min-w-[180px]"
              >
                <option value="">All Categories</option>
                <option value="Crop Production">🌾 Crop Production</option>
                <option value="Livestock">🐄 Livestock</option>
                <option value="Sustainable Agriculture">🌱 Sustainable Agriculture</option>
                <option value="Agribusiness">💼 Agribusiness</option>
              </select>
              
              <select 
                value={filter.level}
                onChange={(e) => setFilter({...filter, level: e.target.value})}
                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white min-w-[150px]"
              >
                <option value="">All Levels</option>
                <option value="Beginner">📚 Beginner</option>
                <option value="Intermediate">📖 Intermediate</option>
                <option value="Advanced">🎓 Advanced</option>
              </select>
              
              <button 
                onClick={loadCourses}
                className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <span>Apply Filters</span>
              </button>
            </div>
            
            {/* Course Count */}
            <div className="text-gray-600 text-sm mb-4">
              Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                {/* Course Header with Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white bg-opacity-90 text-primary-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-secondary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {course.duration_hours}h
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="bg-white bg-opacity-90 text-primary-800 text-xs font-medium px-2 py-1 rounded-full inline-block">
                      📚 {course.category}
                    </span>
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem]">
                    {course.description}
                  </p>
                  
                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{course.modules.length} modules</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>{course.language}</span>
                    </div>
                  </div>
                  
                  {/* Enrollment Status Indicator */}
                  {isEnrolled(course._id) && (
                    <div className="mb-3">
                      <div className="flex items-center space-x-1 text-green-600 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Enrolled</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Action Button */}
                  <button
                    onClick={() => handleEnroll(course._id)}
                    disabled={isEnrolled(course._id)}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
                      isEnrolled(course._id)
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isEnrolled(course._id) ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Continue Learning</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>Enroll Now</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;