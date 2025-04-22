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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Course {
  id: number;
  title: string;
  instructor: string;
  startDate: string;
  endDate: string;
  maxEnrollment: number;
  status: string;
}

const CourseManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // 임시 데이터
  const courses: Course[] = [
    {
      id: 1,
      title: '리액트 기초 과정',
      instructor: '김강사',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      maxEnrollment: 30,
      status: '진행중',
    },
    {
      id: 2,
      title: 'TypeScript 심화 과정',
      instructor: '이강사',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      maxEnrollment: 20,
      status: '예정',
    },
  ];

  const handleClickOpen = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
    } else {
      setSelectedCourse(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const handleSave = () => {
    // 저장 로직 구현 예정
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">과정 관리</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleClickOpen()}
        >
          과정 등록
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>과정명</TableCell>
              <TableCell>강사</TableCell>
              <TableCell>기간</TableCell>
              <TableCell>정원</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  {course.startDate} ~ {course.endDate}
                </TableCell>
                <TableCell>{course.maxEnrollment}명</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleClickOpen(course)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCourse ? '과정 수정' : '새 과정 등록'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="과정명"
                  defaultValue={selectedCourse?.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="강사"
                  defaultValue={selectedCourse?.instructor}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="시작일"
                  type="date"
                  defaultValue={selectedCourse?.startDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="종료일"
                  type="date"
                  defaultValue={selectedCourse?.endDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="정원"
                  type="number"
                  defaultValue={selectedCourse?.maxEnrollment}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>상태</InputLabel>
                  <Select
                    label="상태"
                    defaultValue={selectedCourse?.status || '예정'}
                  >
                    <MenuItem value="예정">예정</MenuItem>
                    <MenuItem value="진행중">진행중</MenuItem>
                    <MenuItem value="완료">완료</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement; 