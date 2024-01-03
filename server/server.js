const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    const resizedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 80, height: 80 })
      .toBuffer();

    res.status(200).json({ resizedImageBuffer: resizedImageBuffer.toString('base64') });
  } catch (error) {
    console.error(error);
    res.status(500).send(' Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
