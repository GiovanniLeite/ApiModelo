import Example from '../models/Example';
import { Op } from 'sequelize';

class ExampleController {
  async index(req, res) {
    try {
      let where = {};

      const { name } = req.params;

      if (name) {
        where = {
          name: { [Op.like]: `%${name}%` },
        };
      }
      const data = await Example.findAll({
        where,
      });
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const data = await Example.create(req.body);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const data = await Example.findByPk(id);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await Example.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Exemplo não existe.'],
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

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const data = await Example.findByPk(id);

      if (!data) {
        return res.status(400).json({
          errors: ['Exemplo não existe.'],
        });
      }

      const dataUpdated = await data.update(req.body);

      return res.json(dataUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ExampleController();
