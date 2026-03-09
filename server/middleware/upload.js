import multer from 'multer';
import path from 'path';

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'audio') {
            cb(null, 'uploads/audio/');
        } else if (file.fieldname === 'coverImage') {
            cb(null, 'uploads/images/');
        } else {
            cb({ message: 'Unknown field' }, false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check File Type
function checkFileType(file, cb) {
    if (file.fieldname === 'audio') {
        const filetypes = /mp3|wav|ogg|mpeg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Audio files only (mp3, wav, ogg)!');
        }
    } else if (file.fieldname === 'coverImage') {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
}

// Initialize Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

export default upload;
