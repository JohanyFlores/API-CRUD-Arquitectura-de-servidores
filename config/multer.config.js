const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './uploads/avatars'); },
  filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) { cb(null, true); }
  else { cb(new Error('Solo se permiten imágenes como avatar'), false); }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;