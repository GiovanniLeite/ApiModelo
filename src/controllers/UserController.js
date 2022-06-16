import File from '../models/File';
import User from '../models/User';

class UserController {
  // Index
  async index(req, res) {
    try {
      if (req.userAdm === 1) {
        const users = await User.findAll({
          order: [
            ['id', 'DESC'],
            [File, 'id', 'DESC'],
          ],
          include: {
            model: File,
            attributes: ['url', 'file_name'],
          },
        });

        return res.json(users);
      } else {
        return res.status(401).json({
          errors: ['Não autorizado.'],
        });
      }
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        order: [
          ['id', 'DESC'],
          [File, 'id', 'DESC'],
        ],
        include: {
          model: File,
          attributes: ['url', 'file_name'],
        },
      });
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  // Store
  async store(req, res) {
    try {
      if (req.userAdm === 1) {
        const newUser = await User.create(req.body);
        newUser.password_hash = '';
        newUser.password = '';
        return res.json(newUser);
      } else {
        const newReqBody = req.body;
        newReqBody.adm = 0;
        const newUser = await User.create(newReqBody);
        newUser.password_hash = '';
        newUser.password = '';
        return res.json(newUser);
      }
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      if (req.userAdm === 1) {
        const data = await user.update(req.body);
        data.password_hash = '';
        return res.json(data);
      } else {
        const newReqBody = req.body;
        newReqBody.adm = 0;
        const data = await user.update(newReqBody);
        data.password_hash = '';
        return res.json(data);
      }
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
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

export default new UserController();
