import path from 'path';

class MemoryChangePageController {
  static fetchMemoryChangePage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/memorychange/index.html'));
  }
}

export default MemoryChangePageController;
