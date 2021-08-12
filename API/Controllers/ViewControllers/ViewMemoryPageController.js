import path from 'path';

class ViewMemoryPageController {
  static fetchSingleMemoryPage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/memory/index.html'));
  }
}

export default ViewMemoryPageController;
