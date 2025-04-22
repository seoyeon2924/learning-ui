import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ContentManagement: React.FC = () => {
  const mockContents = [
    {
      id: 1,
      title: '온라인 교육 기초',
      type: '동영상',
      duration: '1시간 30분',
      uploadDate: '2024-03-20',
    },
    {
      id: 2,
      title: '실습 가이드',
      type: 'PDF',
      duration: '-',
      uploadDate: '2024-03-21',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">콘텐츠 관리</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          콘텐츠 등록
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>유형</TableCell>
              <TableCell>재생시간</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockContents.map((content) => (
              <TableRow key={content.id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>{content.duration}</TableCell>
                <TableCell>{content.uploadDate}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    수정
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ContentManagement; 