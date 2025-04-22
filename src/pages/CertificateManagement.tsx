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
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';

interface Certificate {
  id: number;
  studentName: string;
  courseName: string;
  completionDate: string;
  grade: string;
  status: 'issued' | 'pending';
}

const CertificateManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 임시 데이터
  const certificates: Certificate[] = [
    {
      id: 1,
      studentName: '김학생',
      courseName: '리액트 기초 과정',
      completionDate: '2024-03-31',
      grade: 'A',
      status: 'issued',
    },
    {
      id: 2,
      studentName: '이학생',
      courseName: 'TypeScript 심화 과정',
      completionDate: '2024-04-30',
      grade: 'B+',
      status: 'pending',
    },
  ];

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'issued':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: Certificate['status']) => {
    switch (status) {
      case 'issued':
        return '발급완료';
      case 'pending':
        return '발급대기';
      default:
        return status;
    }
  };

  const handleDownload = (id: number) => {
    // PDF 다운로드 로직 구현 예정
    console.log('Download certificate:', id);
  };

  const handleSendEmail = (id: number) => {
    // 이메일 발송 로직 구현 예정
    console.log('Send email:', id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        수료증 관리
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="학습자명 또는 과정명으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>학습자</TableCell>
              <TableCell>과정명</TableCell>
              <TableCell>이수일</TableCell>
              <TableCell>성적</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.studentName}</TableCell>
                <TableCell>{cert.courseName}</TableCell>
                <TableCell>{cert.completionDate}</TableCell>
                <TableCell>{cert.grade}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(cert.status)}
                    color={getStatusColor(cert.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleDownload(cert.id)}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleSendEmail(cert.id)}
                  >
                    <EmailIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
        >
          일괄 다운로드
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EmailIcon />}
        >
          일괄 이메일 발송
        </Button>
      </Box>
    </Box>
  );
};

export default CertificateManagement; 