import path from 'path';

class LoginPageController {
  static fetchLoginPage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/login/index.html'));
  }
}

export default LoginPageController;
