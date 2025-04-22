import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

interface Course {
  id: number;
  name: string;
  instructor: string;
  courseStartDate: string;
  courseEndDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  maxParticipants: number;
  currentParticipants?: number;
  description: string;
  credits: number;
}

const CourseList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('과정 목록을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const handleRegister = async (courseId: number) => {
    try {
      await axios.post('http://localhost:8080/api/course-registrations', {
        courseId,
        userId: 1, // TODO: 실제 로그인된 사용자 ID로 변경
      });
      setSnackbar({
        open: true,
        message: '수강신청이 완료되었습니다.',
        severity: 'success',
      });
      setOpenDialog(false);
      fetchCourses(); // 목록 새로고침
    } catch (err) {
      setSnackbar({
        open: true,
        message: '수강신청 중 오류가 발생했습니다.',
        severity: 'error',
      });
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRegistrationStatus = (course: Course) => {
    const now = new Date();
    const startDate = new Date(course.registrationStartDate);
    const endDate = new Date(course.registrationEndDate);

    if (now < startDate) return { text: '신청 예정', color: 'warning' };
    if (now > endDate) return { text: '신청 마감', color: 'error' };
    return { text: '신청 가능', color: 'success' };
  };

  if (loading) return <Box p={3}>로딩 중...</Box>;
  if (error) return <Box p={3}>{error}</Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">과정 목록</Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="과정명 또는 강사명으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>과정명</TableCell>
              <TableCell>강사</TableCell>
              <TableCell>학점</TableCell>
              <TableCell>수강기간</TableCell>
              <TableCell>신청기간</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="right">수강인원</TableCell>
              <TableCell align="right">수강신청</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses
              .filter(
                (course) =>
                  course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => {
                const status = getRegistrationStatus(course);
                return (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}학점</TableCell>
                    <TableCell>
                      {new Date(course.courseStartDate).toLocaleDateString()} ~{' '}
                      {new Date(course.courseEndDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(course.registrationStartDate).toLocaleDateString()} ~{' '}
                      {new Date(course.registrationEndDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={status.text}
                        color={status.color as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {course.currentParticipants || 0}/{course.maxParticipants}명
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          setSelectedCourse(course);
                          setOpenDialog(true);
                        }}
                        disabled={status.text !== '신청 가능'}
                      >
                        신청
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={courses.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="페이지당 행 수"
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>수강신청 확인</DialogTitle>
        <DialogContent>
          <Typography>
            {selectedCourse?.name} ({selectedCourse?.credits}학점) 과정을
            신청하시겠습니까?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            강사: {selectedCourse?.instructor}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            수강기간: {selectedCourse?.courseStartDate} ~ {selectedCourse?.courseEndDate}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button
            onClick={() => selectedCourse && handleRegister(selectedCourse.id)}
            variant="contained"
            color="primary"
          >
            신청
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseList; 