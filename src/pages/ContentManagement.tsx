import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface Content {
  id: number;
  title: string;
  type: string;
  duration: string;
  uploadDate: string;
  url: string;
}

const CONTENT_TYPES = ['동영상', 'PDF', 'ZIP'];

const ContentManagement: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    type: '동영상',
    duration: '',
    url: '',
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/contents');
      setContents(response.data);
      setLoading(false);
    } catch (err) {
      setError('콘텐츠 목록을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/contents/${id}`);
      fetchContents(); // 목록 새로고침
    } catch (err) {
      setError('콘텐츠 삭제에 실패했습니다.');
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:8080/api/contents', newContent);
      setOpenDialog(false);
      setNewContent({
        title: '',
        type: '동영상',
        duration: '',
        url: '',
      });
      fetchContents(); // 목록 새로고침
    } catch (err) {
      setError('콘텐츠 등록에 실패했습니다.');
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">콘텐츠 관리</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          콘텐츠 등록
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
            {contents.map((content) => (
              <TableRow key={content.id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>{content.duration}</TableCell>
                <TableCell>{new Date(content.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    수정
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={() => handleDelete(content.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>콘텐츠 등록</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="제목"
              fullWidth
              value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            />
            <TextField
              select
              label="유형"
              fullWidth
              value={newContent.type}
              onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
            >
              {CONTENT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="재생시간"
              fullWidth
              value={newContent.duration}
              onChange={(e) => setNewContent({ ...newContent, duration: e.target.value })}
              placeholder="예: 1시간 30분, PDF의 경우 -"
            />
            <TextField
              label="URL"
              fullWidth
              value={newContent.url}
              onChange={(e) => setNewContent({ ...newContent, url: e.target.value })}
              placeholder="예: https://example.com/content.mp4"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button 
            variant="contained" 
            onClick={handleCreate}
            disabled={!newContent.title || !newContent.url}
          >
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentManagement; 