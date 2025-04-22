import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface User {
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
}

interface Course {
  id: number;
  title: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  completionDate?: string;
}

const MyPage: React.FC = () => {
  // 임시 사용자 데이터
  const user: User = {
    name: '김학생',
    email: 'student@example.com',
    department: '개발팀',
    position: '주임',
    joinDate: '2023-01-01',
  };

  // 임시 과정 데이터
  const courses: Course[] = [
    {
      id: 1,
      title: '리액트 기초 과정',
      progress: 75,
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'TypeScript 심화 과정',
      progress: 100,
      status: 'completed',
      completionDate: '2024-02-28',
    },
    {
      id: 3,
      title: 'Node.js 기초',
      progress: 0,
      status: 'not-started',
    },
  ];

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'in-progress':
        return 'primary';
      case 'completed':
        return 'success';
      case 'not-started':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'in-progress':
        return '학습중';
      case 'completed':
        return '완료';
      case 'not-started':
        return '미시작';
      default:
        return status;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        마이페이지
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, mb: 2 }}
                alt={user.name}
                src="/static/images/avatar/1.jpg"
              />
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="textSecondary">{user.email}</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText primary="소속" secondary={user.department} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="직급" secondary={user.position} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="입사일" secondary={user.joinDate} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              나의 학습 현황
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>과정명</TableCell>
                    <TableCell>진도율</TableCell>
                    <TableCell>상태</TableCell>
                    <TableCell>이수일</TableCell>
                    <TableCell align="right">수료증</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.progress}%</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(course.status)}
                          color={getStatusColor(course.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{course.completionDate || '-'}</TableCell>
                      <TableCell align="right">
                        {course.status === 'completed' && (
                          <Button
                            startIcon={<DownloadIcon />}
                            size="small"
                          >
                            수료증
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyPage; 