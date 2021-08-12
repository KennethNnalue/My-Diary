import path from 'path';

class DashBoardPageController {
  static fetchDashBoardPage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/dashboard/index.html'));
  }
}

export default DashBoardPageController;
