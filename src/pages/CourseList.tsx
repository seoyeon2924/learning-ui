import React, { useState } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Course {
  id: number;
  title: string;
  instructor: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  enrollmentCount: number;
}

const CourseList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // 임시 데이터
  const courses: Course[] = [
    {
      id: 1,
      title: '리액트 기초 과정',
      instructor: '김강사',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      status: 'ongoing',
      enrollmentCount: 25,
    },
    {
      id: 2,
      title: 'TypeScript 심화 과정',
      instructor: '이강사',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      status: 'upcoming',
      enrollmentCount: 15,
    },
    // 더 많은 과정 데이터가 여기에 들어갈 예정
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'ongoing':
        return 'primary';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'ongoing':
        return '진행중';
      case 'upcoming':
        return '예정';
      case 'completed':
        return '완료';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">과정 목록</Typography>
        <Button variant="contained" color="primary">
          수강신청
        </Button>
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
              <TableCell>기간</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="right">수강인원</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    {course.startDate} ~ {course.endDate}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(course.status)}
                      color={getStatusColor(course.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{course.enrollmentCount}명</TableCell>
                </TableRow>
              ))}
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
    </Box>
  );
};

export default CourseList; 