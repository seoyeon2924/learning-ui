import React from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  height: '100%',
}));

const StyledChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const Statistics: React.FC = () => {
  const courseCompletionOption: EChartsOption = {
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'shadow' as const,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category' as const,
      data: ['1월', '2월', '3월', '4월', '5월', '6월'],
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: {
        formatter: '{value}%',
        color: '#666',
      },
    },
    series: [
      {
        name: '이수율',
        type: 'bar' as const,
        data: [75, 82, 78, 85, 88, 92],
        itemStyle: {
          color: '#1976d2',
        },
      },
    ],
  };

  const monthlyEnrollmentOption: EChartsOption = {
    tooltip: {
      trigger: 'axis' as const,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category' as const,
      data: ['1월', '2월', '3월', '4월', '5월', '6월'],
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: {
        color: '#666',
      },
    },
    series: [
      {
        name: '수강신청 수',
        type: 'line' as const,
        data: [120, 150, 180, 220, 260, 300],
        itemStyle: {
          color: '#2196f3',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(33, 150, 243, 0.3)',
            }, {
              offset: 1,
              color: 'rgba(33, 150, 243, 0)',
            }],
          },
        },
        smooth: true,
      },
    ],
  };

  const courseDistributionOption: EChartsOption = {
    tooltip: {
      trigger: 'item' as const,
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical' as const,
      right: 10,
      top: 'center',
      textStyle: {
        color: '#666',
      },
    },
    series: [
      {
        name: '과정 분포',
        type: 'pie' as const,
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 35, name: '프로그래밍', itemStyle: { color: '#1976d2' } },
          { value: 25, name: '디자인', itemStyle: { color: '#2196f3' } },
          { value: 20, name: '마케팅', itemStyle: { color: '#64b5f6' } },
          { value: 15, name: '비즈니스', itemStyle: { color: '#90caf9' } },
          { value: 5, name: '기타', itemStyle: { color: '#bbdefb' } },
        ],
      },
    ],
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
        통계
      </Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <StyledPaper>
          <StyledChartTitle variant="h6">과정 이수율 추이</StyledChartTitle>
          <ReactECharts option={courseCompletionOption} style={{ height: '300px' }} />
        </StyledPaper>
        <StyledPaper>
          <StyledChartTitle variant="h6">월별 수강신청 현황</StyledChartTitle>
          <ReactECharts option={monthlyEnrollmentOption} style={{ height: '300px' }} />
        </StyledPaper>
      </Box>
      <Box sx={{ mt: 3 }}>
        <StyledPaper>
          <StyledChartTitle variant="h6">과정 분야별 분포</StyledChartTitle>
          <ReactECharts option={courseDistributionOption} style={{ height: '400px' }} />
        </StyledPaper>
      </Box>
    </Box>
  );
};

export default Statistics; 