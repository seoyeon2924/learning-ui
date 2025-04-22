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

const EMPTY_CONTENT = {
  title: '',
  type: '동영상',
  duration: '',
  url: '',
};

const ContentManagement: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState(EMPTY_CONTENT);

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

  const handleOpenDialog = (content?: Content) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        title: content.title,
        type: content.type,
        duration: content.duration,
        url: content.url,
      });
    } else {
      setEditingContent(null);
      setFormData(EMPTY_CONTENT);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingContent(null);
    setFormData(EMPTY_CONTENT);
  };

  const handleSubmit = async () => {
    try {
      if (editingContent) {
        // 수정
        await axios.put(`http://localhost:8080/api/contents/${editingContent.id}`, formData);
      } else {
        // 등록
        await axios.post('http://localhost:8080/api/contents', formData);
      }
      handleCloseDialog();
      fetchContents(); // 목록 새로고침
    } catch (err) {
      setError(editingContent ? '콘텐츠 수정에 실패했습니다.' : '콘텐츠 등록에 실패했습니다.');
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
          onClick={() => handleOpenDialog()}
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
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenDialog(content)}
                  >
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingContent ? '콘텐츠 수정' : '콘텐츠 등록'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="제목"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              select
              label="유형"
              fullWidth
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="예: 1시간 30분, PDF의 경우 -"
            />
            <TextField
              label="URL"
              fullWidth
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="예: https://example.com/content.mp4"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.title || !formData.url}
          >
            {editingContent ? '수정' : '등록'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentManagement; 