import api from './api';
import { Course, ApplicationStatus } from '../types/course';

export const courseService = {
    getAvailableCourses: () => api.get<Course[]>('/courses/available'),
    
    getCourseById: (id: number) => api.get<Course>(`/courses/${id}`),
    
    applyForCourse: (courseId: number) => 
        api.post<ApplicationStatus>('/applications', { courseId }),
        
    getMyApplications: () => 
        api.get<ApplicationStatus[]>('/applications/my'),
};
