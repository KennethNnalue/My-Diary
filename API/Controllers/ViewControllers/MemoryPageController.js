import path from 'path';

class MemoryPageController {
  static fetchMemoryPage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/memory/index.html'));
  }
}

export default MemoryPageController;
