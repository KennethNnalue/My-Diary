import models from '../models';

class AllMemoriesController {
  static async fetchAllMemories(request, response) {
    try {
      const [[result]] = await models.sequelize.query('SELECT * FROM "Memories" WHERE "userId" = :userId', {
        replacements: { userId: request.userWallet.userId }
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

export default AllMemoriesController;
