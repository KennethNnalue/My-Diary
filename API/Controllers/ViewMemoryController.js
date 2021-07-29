import { getMemory } from '../Helpers/query';

class ViewMemoryController {
  static fetchViewMemory(request, response) {
    const diaryId = request.params.id;

    const memory = getMemory(diaryId);

    if (!memory) {
      return response.status(404).json(
        {
          message: 'Result not found'
        }
      );
    }

    return response.json(memory);
  }
}

export default ViewMemoryController;
