import path from 'path';

class HomePageController {
  static fetchHomePage(request, response) {
    return response.sendFile(path.join(__dirname, '../../UI/landingpage.html'));
  }
}

export default HomePageController;
