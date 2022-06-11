import multer from 'multer';
import { extname, resolve } from 'path';

// returns a value between 10k and 20k
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // make sure the file is png or jpg
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }
    return cb(null, true);
  },
  // upload the image
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
