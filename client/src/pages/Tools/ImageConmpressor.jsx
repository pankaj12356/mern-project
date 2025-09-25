import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Slider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const toolOptions = [
  { path: '/tools/uuid', label: '🔑 UUID Generator' },
  { path: '/tools/json', label: '🧠 JSON Formatter' },
  { path: '/tools/jwt', label: '🔐 JWT Decoder' },
  { path: '/tools/base64', label: '📦 Base64 Converter' },
  { path: '/tools/space', label: '✂️ Space Remover' },
  { path: '/tools/image-compressor', label: '📉 Image Compressor' },
  { path: '/tools/image-type-converter', label: '🔄 Image Type Converter' },
];

const ImageCompressor = () => {
  const [selectedTool, setSelectedTool] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [compressedSrc, setCompressedSrc] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedTool(location.pathname);
  }, [location.pathname]);

  const handleToolChange = (event) => {
    const selected = event.target.value;
    setSelectedTool(selected);
    navigate(selected);
  };

  const handleBackToTools = () => {
    navigate('/tools');
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('❌ Please upload a valid image file.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target.result;
      setImageSrc(src);
      setOriginalSize(file.size);
      compressImage(src);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          setCompressedSrc(URL.createObjectURL(blob));
          setCompressedSize(blob.size);
        },
        'image/jpeg',
        quality / 100
      );
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = compressedSrc;
    link.download = 'compressed.jpg';
    link.click();
  };

  const getReduction = () => {
    if (!originalSize || !compressedSize) return 0;
    return (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#E7F2EF',
        py: 8,
        px: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 4, borderRadius: 3 }}>
        <CardContent sx={{ px: 4, py: 6 }}>
          {/* 🔙 Back + Switch Tool */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleBackToTools}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '20px',
                backgroundColor: '#F0FDF4',
                color: '#059669',
                '&:hover': { backgroundColor: '#D1FAE5' },
              }}
            >
              ← Back to Tools
            </Button>

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Switch Tool</InputLabel>
              <Select
                value={selectedTool}
                label="Switch Tool"
                onChange={handleToolChange}
              >
                {toolOptions.map((tool) => (
                  <MenuItem key={tool.path} value={tool.path}>
                    {tool.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 🧠 Title + Description */}
          <Typography
            variant="h4"
            sx={{
              color: '#19183B',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
          >
            Image Compressor 📉
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#475569',
              textAlign: 'center',
              mb: 1,
            }}
          >
            Compress images for faster loading, smaller storage, and secure sharing — all in your browser.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#475569',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Images from phones or cameras can take up space or slow down websites. Compressing helps free up device storage, speed up website loading, and reduce hosting costs.
          </Typography>

          {/* 📤 Upload Zone */}
          <Box
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current.click()}
            sx={{
              border: '2px dashed #A5B4FC',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#F3F4F6',
              '&:hover': { backgroundColor: '#E0E7FF' },
              mb: 3,
              minHeight: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body1">🖼️ Drag & Drop or Click to Upload</Typography>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* 🎚️ Compression Slider */}
          <Typography gutterBottom>Compression Quality: {quality}%</Typography>
          <Slider
            value={quality}
            onChange={(e, val) => setQuality(val)}
            min={10}
            max={100}
            step={5}
            valueLabelDisplay="auto"
            color="primary"
            sx={{ mb: 3 }}
          />

          {/* 📷 Preview Section */}
          {imageSrc && compressedSrc && (
            <Stack spacing={2}>
              <Typography variant="subtitle1">📷 Preview & Size Comparison</Typography>
              <Stack direction="row" spacing={4} justifyContent="center">
                <Box sx={{ textAlign: 'center' }}>
                  <img src={imageSrc} alt="Original" width={200} style={{ borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Original: {(originalSize / 1024).toFixed(2)} KB
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <img src={compressedSrc} alt="Compressed" width={200} style={{ borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Compressed: {(compressedSize / 1024).toFixed(2)} KB
                    <br />
                    🔻 Reduced by: {getReduction()}%
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="outlined"
                color="success"
                onClick={handleDownload}
                sx={{ textTransform: 'none', fontWeight: 500 }}
                           >
                Download Compressed Image
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageCompressor;