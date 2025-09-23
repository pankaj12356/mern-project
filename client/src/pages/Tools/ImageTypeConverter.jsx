import { useState, useRef } from 'react';
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

const ImageTypeConverterPage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [convertedSrc, setConvertedSrc] = useState(null);
  const [originalFormat, setOriginalFormat] = useState('');
  const [format, setFormat] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef();

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
    <Box className="min-h-screen bg-white py-10 px-6">
      <Box className="max-w-6xl mx-auto space-y-10">
        {/* Title */}
        <Typography variant="h3" className="text-indigo-600 font-bold text-center">
          Image Type Converter 🔄
        </Typography>

        {/* Upload Zone */}
        <Card>
          <CardContent className="space-y-4">
            <Typography variant="h6">Upload Image</Typography>
            <Box
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-indigo-400 rounded-md p-6 text-center cursor-pointer bg-gray-50 hover:bg-indigo-50"
              sx={{ minHeight: 200 }}
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

            {error && <Alert severity="error">{error}</Alert>}

            {/* Format Selector */}
            {originalFormat && (
              <FormControl fullWidth>
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

            {/* Preview & Download */}
            {imageSrc && convertedSrc && (
              <Stack spacing={2}>
                <Typography variant="subtitle1">📷 Preview</Typography>
                <Stack direction="row" spacing={4} justifyContent="center">
                  <Box>
                    <img src={imageSrc} alt="Original" width={200} className="rounded shadow" />
                    <Typography variant="body2" className="text-center mt-1">
                      Original ({originalFormat.toUpperCase()})
                    </Typography>
                  </Box>
                  <Box>
                    <img src={convertedSrc} alt="Converted" width={200} className="rounded shadow" />
                    <Typography variant="body2" className="text-center mt-1">
                      Converted ({normalizeFormat(format).toUpperCase()})
                    </Typography>
                  </Box>
                </Stack>
                <Button variant="outlined" color="success" onClick={handleDownload}>
                  Download Converted Image
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card>
          <CardContent className="space-y-4">
            <Typography variant="h5">What is Image Format Conversion?</Typography>
            <Typography variant="body2" color="textSecondary">
              Image format conversion is the process of changing an image from one file type to another—like converting a PNG to JPEG or a WebP to PNG. Each format has its own strengths:
              <ul className="list-disc list-inside mt-2">
                <li><strong>JPEG:</strong> Great for photos, small size, lossy compression</li>
                <li><strong>PNG:</strong> Supports transparency, lossless quality</li>
                <li><strong>WebP:</strong> Modern format with excellent compression and quality balance</li>
              </ul>
            </Typography>

            <Divider />

            <Typography variant="h5">Why Convert Image Formats?</Typography>
            <Typography variant="body2" color="textSecondary">
              Depending on your use case, converting image formats can help:
              <ul className="list-disc list-inside mt-2">
                <li>🌐 Optimize images for web performance</li>
                <li>📱 Reduce file size for mobile apps</li>
                <li>🎨 Preserve transparency or quality</li>
                <li>🧩 Meet platform-specific format requirements</li>
              </ul>
            </Typography>

            <Divider />

            <Typography variant="h5">Is It Safe?</Typography>
            <Typography variant="body2" color="textSecondary">
              Yes. Your original image stays untouched. All conversions happen locally in your browser—no upload required. You can safely experiment with formats without losing your original file.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ImageTypeConverterPage;