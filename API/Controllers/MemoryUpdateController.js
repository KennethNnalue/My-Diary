import models from '../models';

class MemoryUpdateController {
  static async updateMemory(request, response) {
    try {
      const [[result]] = await models.sequelize.query('UPDATE "Memories" SET "title" = :title, "story" = :story, "mood" = :mood, "picture" = :picture, "userId" = :userId,  "updatedAt" = :updatedAt WHERE ("userId" = :userId) AND ("id" = :id)   RETURNING *;', {
        replacements: {
          userId: request.userWallet.userId,
          id: request.params.id,
          title: request.body.title,
          story: request.body.story,
          picture: request.body.picture,
          mood: request.body.mood,
          updatedAt: new Date(Date.now())

        }
      });
      return response.status(200).json({
        message: 'memory updated',
        memory: result
      });
    } catch (e) {
      return response.status(500).json({
        message: 'Internal Sever Error',
        error: e.toString()

      });
    }
  }
}

export default MemoryUpdateController;
