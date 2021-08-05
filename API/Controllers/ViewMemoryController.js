import models from '../models';

class ViewMemoryController {
  static async fetchViewMemory(request, response) {
    try {
      const [[result]] = await models.sequelize.query('SELECT * FROM "Memories" WHERE ("userId" = :userId) AND ("id" = :id)', {
        replacements: {
          userId: request.userWallet.userId,
          id: request.params.id

        }
      });
      return response.json(result);
    } catch (e) {
      return response.status(500).json({
        message: 'Internal Sever Error',
        error: e.toString()

      });
    }
  }
}

export default ViewMemoryController;
