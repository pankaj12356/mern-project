import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Divider,
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

const ImageTypeConverterPage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [convertedSrc, setConvertedSrc] = useState(null);
  const [originalFormat, setOriginalFormat] = useState('');
  const [format, setFormat] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFormat('');
  }, [imageSrc]);

  const supportedFormats = ['jpeg', 'png', 'webp'];

  const getMimeType = (fmt) => {
    switch (fmt) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'webp':
        return 'image/webp';
      default:
        return 'image/jpeg';
    }
  };

  const normalizeFormat = (fmt) => (fmt === 'jpg' ? 'jpeg' : fmt);

  const detectFormat = (fileType) => {
    if (fileType.includes('jpeg') || fileType.includes('jpg')) return 'jpeg';
    if (fileType.includes('png')) return 'png';
    if (fileType.includes('webp')) return 'webp';
    return '';
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('❌ Please upload a valid image file.');
      return;
    }

    const detected = detectFormat(file.type);
    setOriginalFormat(detected);
    setFormat(supportedFormats.find((f) => f !== detected) || 'jpeg');

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target.result;
      setImageSrc(src);
      convertImage(src, format);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = (src, fmt) => {
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
          setConvertedSrc(URL.createObjectURL(blob));
        },
        getMimeType(fmt)
      );
    };
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = convertedSrc;
    link.download = `converted.${normalizeFormat(format)}`;
    link.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E7F2EF', py: 8, px: 4 }}>
     <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  <Card sx={{ width: '100%', maxWidth: 800, boxShadow: 4, borderRadius: 3, mb: 6 }}>
          <CardContent sx={{ px: 4, py: 6 }}>
            {/* 🔙 Back + Switch Tool */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate('/tools')}
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
                  value={location.pathname}
                  label="Switch Tool"
                  onChange={(e) => navigate(e.target.value)}
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
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#19183B', textAlign: 'center', mb: 2 }}>
              Image Type Converter 🔄
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 1 }}>
              Convert images between JPEG, PNG, and WebP formats — all locally in your browser.
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', textAlign: 'center', mb: 4 }}>
              Preserve transparency, reduce size, or meet platform requirements without losing your original file.
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

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* 🎛️ Format Selector */}
            {originalFormat && (
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Convert To</InputLabel>
                <Select
                  value={format}
                  label="Convert To"
                  onChange={(e) => {
                    setFormat(e.target.value);
                    if (imageSrc) convertImage(imageSrc, e.target.value);
                  }}
                >
                  {supportedFormats
                    .filter((f) => f !== originalFormat)
                    .map((f) => (
                      <MenuItem key={f} value={f}>
                        {f.toUpperCase()}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}

            {/* 📷 Preview & Download */}
            {imageSrc && convertedSrc && (
              <Stack spacing={2}>
                <Typography variant="subtitle1">📷 Preview</Typography>
                <Stack direction="row" spacing={4} justifyContent="center">
                  <Box sx={{ textAlign: 'center' }}>
                    <img src={imageSrc} alt="Original" width={200} style={{ borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Original ({originalFormat.toUpperCase()})
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <img src={convertedSrc} alt="Converted" width={200} style={{ borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Converted ({normalizeFormat(format).toUpperCase()})
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleDownload}
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  Download Converted Image
                </Button>
              </Stack>
            )}
          </CardContent>
                  </Card>
      </Box>
    </Box>
  );
};

export default ImageTypeConverterPage;