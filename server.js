const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000; // Replace with your desired port number

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads'); // Directory where uploaded files will be saved
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to handle file uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
