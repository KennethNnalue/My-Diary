import path from 'path';

class DashBoardController {
  static fetchDashBoard(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/dashboard/index.html'));
  }
}

export default DashBoardController;
