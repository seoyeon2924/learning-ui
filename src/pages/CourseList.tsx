import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

interface Course {
  id: number;
  title: string;
  instructor: string;
  credits: number;
  maxParticipants: number;
  registrationStartDate: string;
  registrationEndDate: string;
  startDate: string;
  endDate: string;
  status: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/courses');
      if (!response.ok) {
        throw new Error('과정 목록을 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      const uniqueCourses = data.filter((course: Course, index: number, self: Course[]) =>
        index === self.findIndex((t) => t.id === course.id)
      );
      setCourses(uniqueCourses);
    } catch (error) {
      alert('과정 목록을 불러오는데 실패했습니다.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('과정 삭제에 실패했습니다.');
      }
      alert('과정이 삭제되었습니다.');
      fetchCourses();
    } catch (error) {
      alert('과정 삭제에 실패했습니다.');
      console.error('Error:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const cleanStatus = status.replace(/['"]/g, '').trim();
    const statusMap: { [key: string]: { color: string; text: string } } = {
      OPEN: { color: 'bg-green-100 text-green-800', text: '수강신청 가능' },
      CLOSED: { color: 'bg-red-100 text-red-800', text: '마감' },
      IN_PROGRESS: { color: 'bg-blue-100 text-blue-800', text: '진행중' },
    };
    const statusInfo = statusMap[cleanStatus] || { color: 'bg-gray-100 text-gray-800', text: cleanStatus };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-6">로딩중...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>과정 목록</h2>
        <Link 
          to="/courses/create"
          style={{ 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            padding: '8px 16px', 
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          과정 등록
        </Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>과정명</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>강사</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>학점</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>수강인원</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>수강신청 기간</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>과정 기간</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>상태</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f3f4f6' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <Link 
                    to={`/courses/${course.id}`}
                    style={{ color: '#2563eb', textDecoration: 'none' }}
                  >
                    {course.title}
                  </Link>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.instructor}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.credits}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{course.maxParticipants}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {dayjs(course.registrationStartDate).format('YYYY-MM-DD')} ~{' '}
                  {dayjs(course.registrationEndDate).format('YYYY-MM-DD')}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {dayjs(course.startDate).format('YYYY-MM-DD')} ~{' '}
                  {dayjs(course.endDate).format('YYYY-MM-DD')}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    backgroundColor: course.status.includes('OPEN') ? '#dcfce7' : 
                                   course.status.includes('CLOSED') ? '#fee2e2' : '#f3f4f6',
                    color: course.status.includes('OPEN') ? '#166534' : 
                           course.status.includes('CLOSED') ? '#991b1b' : '#374151'
                  }}>
                    {course.status.includes('OPEN') ? '수강신청 가능' :
                     course.status.includes('CLOSED') ? '마감' :
                     course.status}
                  </span>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link 
                      to={`/courses/edit/${course.id}`}
                      style={{ color: '#2563eb', textDecoration: 'none' }}
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      style={{ 
                        color: '#dc2626', 
                        border: 'none', 
                        background: 'none', 
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList; 