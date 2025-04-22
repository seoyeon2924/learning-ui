import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Pages
import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseManagement from './pages/CourseManagement';
import ContentManagement from './pages/ContentManagement';
import CertificateManagement from './pages/CertificateManagement';
import Statistics from './pages/Statistics';
import MyPage from './pages/MyPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="course-management" element={<CourseManagement />} />
            <Route path="content-management" element={<ContentManagement />} />
            <Route path="certificate-management" element={<CertificateManagement />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
