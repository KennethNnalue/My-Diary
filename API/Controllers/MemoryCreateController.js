import models from '../models';

class MemoryCreateController {
  static async createMemory(request, response) {
    try {
      const [[result]] = await models.sequelize.query('INSERT INTO "Memories" ("title", "story", "mood", "picture", "userId", "createdAt", "updatedAt") VALUES (:title, :story, :mood, :picture,:userId, :createdAt, :updatedAt) RETURNING *;', {
        replacements: {
          userId: request.userWallet.userId,
          title: request.body.title,
          story: request.body.story,
          picture: request.body.picture,
          mood: request.body.mood,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())

        }
      });
      return response.status(201).json({
        message: 'Memory is Created Successfully',
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

export default MemoryCreateController;
