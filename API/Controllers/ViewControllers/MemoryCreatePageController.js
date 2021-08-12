import path from 'path';

class MemoryCreatePageController {
  static fetchMemoryCreatePage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/memorycreate/index.html'));
  }
}

export default MemoryCreatePageController;
