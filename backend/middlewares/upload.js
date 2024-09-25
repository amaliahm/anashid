import multer from 'multer';

const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'image/webp',
    'audio/mpeg', 
    'audio/wav',   
    'audio/ogg'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only images are allowed!'), false); // Reject file
  }
};

const upload = multer({
  storage: storage,
  limits: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, { fileSize: 1024 * 1024 * 5 });
    } else if (file.mimetype.startsWith('audio/')) {
      cb(null, { fileSize: 1024 * 1024 * 20 }); 
    }
  },
  fileFilter: fileFilter
});

export default upload;
