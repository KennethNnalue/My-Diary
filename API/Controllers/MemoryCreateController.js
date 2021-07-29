import { createMemory } from '../Helpers/query';

class MemoryCreateController {
  static createMemory(request, response) {
    const { title } = request.body;
    const { mood } = request.body;
    const { story } = request.body;
    const { picture } = request.body;

    createMemory(title, story, mood, picture);

    return response.status(201).json({
      message: 'Memory has been created'
    });
  }
}

export default MemoryCreateController;
