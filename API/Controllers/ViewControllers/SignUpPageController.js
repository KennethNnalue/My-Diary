import path from 'path';

class SignUpPageController {
  static fetchSignUpPage(request, response) {
    return response.sendFile(path.join(__dirname, '../../../Client/signup/index.html'));
  }
}

export default SignUpPageController;
