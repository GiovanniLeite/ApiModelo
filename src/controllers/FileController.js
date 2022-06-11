import multer from 'multer';
import multerConfig from '../config/multerConfig';

import File from '../models/File';

const upload = multer(multerConfig).single('file');

class FileController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { user_id } = req.body;
        const file = await File.create({
          original_name: originalname,
          file_name: filename,
          user_id,
        });

        return res.json(file);
      } catch (e) {
        return res.status(400).json({
          errors: ['Arquivo não existe'],
        });
      }
    });
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await File.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Arquivo não existe.'],
        });
      }
      await data.destroy();

      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new FileController();
