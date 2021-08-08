import path from 'path';

class HomePageController {
  static fetchHomePage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/landing/index.html'));
  }
}

export default HomePageController;
