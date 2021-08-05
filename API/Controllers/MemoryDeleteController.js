import models from '../models';

class MemoryDeleteController {
  static async deleteMemory(request, response) {
    try {
      await models.sequelize.query('DELETE  FROM "Memories" WHERE ("userId" = :userId) AND ("id" = :id)', {
        replacements: {
          userId: request.userWallet.userId,
          id: request.params.id

        }
      });
      return response.json({
        message: 'memory deleted'
      });
    } catch (e) {
      return response.status(500).json({
        message: 'Internal Sever Error',
        error: e.toString()

      });
    }
  }
}

export default MemoryDeleteController;
