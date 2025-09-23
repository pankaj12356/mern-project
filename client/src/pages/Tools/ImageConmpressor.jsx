import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Slider,
  Alert,
  Divider,
} from '@mui/material';

const ImageCompressorPage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [compressedSrc, setCompressedSrc] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

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

  useEffect(() => {
    if (imageSrc) compressImage(imageSrc);
  }, [quality]);

  const getReduction = () => {
    if (!originalSize || !compressedSize) return 0;
    return (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);
  };

  return (
    <Box className="min-h-screen bg-white py-10 px-6">
      <Box className="max-w-6xl mx-auto space-y-10">
        <Typography variant="h3" className="text-indigo-600 font-bold text-center">
          Online Image Compressor 📉
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

            {/* Compression Slider */}
            <Box>
              <Typography gutterBottom>Compression Quality: {quality}%</Typography>
              <Slider
                value={quality}
                onChange={(e, val) => setQuality(val)}
                min={10}
                max={100}
                step={5}
                valueLabelDisplay="auto"
                color="primary"
              />
            </Box>

            {/* Preview */}
            {imageSrc && compressedSrc && (
              <Stack spacing={2}>
                <Typography variant="subtitle1">📷 Preview & Size Comparison</Typography>
                <Stack direction="row" spacing={4} justifyContent="center">
                  <Box>
                    <img src={imageSrc} alt="Original" width={200} className="rounded shadow" />
                    <Typography variant="body2" className="text-center mt-1">
                      Original: {(originalSize / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                  <Box>
                    <img src={compressedSrc} alt="Compressed" width={200} className="rounded shadow" />
                    <Typography variant="body2" className="text-center mt-1">
                      Compressed: {(compressedSize / 1024).toFixed(2)} KB
                      <br />
                      🔻 Reduced by: {getReduction()}%
                    </Typography>
                  </Box>
                </Stack>
                <Button variant="outlined" color="success" onClick={handleDownload}>
                  Download Compressed Image
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card>
          <CardContent className="space-y-4">
            <Typography variant="h5">What is Image Compression?</Typography>
            <Typography variant="body2" color="textSecondary">
              Compression reduces file size by encoding data more efficiently. There are two types:
              <ul className="list-disc list-inside mt-2">
                <li><strong>Lossless:</strong> No quality loss, removes redundant data.</li>
                <li><strong>Lossy:</strong> Reduces quality slightly to save more space.</li>
              </ul>
            </Typography>

            <Divider />

            <Typography variant="h5">Why Compress Images?</Typography>
            <Typography variant="body2" color="textSecondary">
              Large images from phones or cameras can take up space or slow down websites. Compressing them helps:
              <ul className="list-disc list-inside mt-2">
                <li>📱 Free up device storage</li>
                <li>🌐 Speed up website loading</li>
                <li>📤 Reduce upload bandwidth</li>
              </ul>
            </Typography>

            <Divider />

            <Typography variant="h5">Is It Safe?</Typography>
            <Typography variant="body2" color="textSecondary">
              Yes. Your original files stay untouched. Compressed images are processed locally in your browser—no upload required.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ImageCompressorPage;