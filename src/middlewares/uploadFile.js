const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Buat folder uploads kalau belum ada
const dir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

// Filter hanya gambar
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, png, webp) are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
