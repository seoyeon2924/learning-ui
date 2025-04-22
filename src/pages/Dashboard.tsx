import React from 'react';
import {
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Box,
  styled,
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  '& .MuiTypography-root': {
    fontSize: '1rem',
    fontWeight: 500,
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiTypography-root': {
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#1976d2',
  },
});

const Dashboard: React.FC = () => {
  // 임시 데이터
  const stats = {
    totalCourses: 24,
    activeCourses: 12,
    totalStudents: 156,
    completionRate: 78,
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: 3,
      backgroundColor: '#fafafa',
      backgroundImage: 'linear-gradient(to bottom right, rgba(255, 182, 193, 0.05), rgba(176, 224, 230, 0.05))',
      minHeight: '100vh'
    }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          color: 'text.primary',
          mb: 3
        }}
      >
        대시보드
      </Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' } }}>
        <StyledCard>
          <StyledCardHeader title="전체 과정 수" />
          <StyledCardContent>
            <Typography>{stats.totalCourses}</Typography>
          </StyledCardContent>
        </StyledCard>
        <StyledCard>
          <StyledCardHeader title="진행중인 과정" />
          <StyledCardContent>
            <Typography>{stats.activeCourses}</Typography>
          </StyledCardContent>
        </StyledCard>
        <StyledCard>
          <StyledCardHeader title="전체 수강생" />
          <StyledCardContent>
            <Typography>{stats.totalStudents}</Typography>
          </StyledCardContent>
        </StyledCard>
        <StyledCard>
          <StyledCardHeader title="평균 이수율" />
          <StyledCardContent>
            <Typography>{stats.completionRate}%</Typography>
          </StyledCardContent>
        </StyledCard>
      </Box>
      <Box sx={{ mt: 3, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' } }}>
        <Paper elevation={1} sx={{ p: 3, backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: 'text.primary' }}>
            최근 등록된 과정
          </Typography>
          {/* 여기에 최근 과정 목록 테이블이 들어갈 예정 */}
        </Paper>
        <Paper elevation={1} sx={{ p: 3, backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: 'text.primary' }}>
            이수율 추이
          </Typography>
          {/* 여기에 차트가 들어갈 예정 */}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 