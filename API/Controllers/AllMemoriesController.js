import memories from '../Data/memories';

class AllMemoriesController {
  static fetchAllMemories(request, response) {
    return response.json(memories);
  }
}

export default AllMemoriesController;
