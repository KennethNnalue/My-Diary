import bcrypt from 'bcrypt-nodejs';
import models from '../models/index';
import createToken from '../security/createToken';

const { User } = models;

class SignUpController {
  static async signUp(request, response) {
    const { name, email, password } = request.body;
    const hashedPassword = bcrypt.hashSync(password);

    const newUser = await User.create({ name, email, password: hashedPassword })
      .catch((error) => response.status(500).json({
        message: 'Internal Sever Error',
        errorMessage: error.toString()
      }));

    if (newUser) {
      return response.status(201).json({
        message: 'You have Successfully Signed Up',
        token: createToken(newUser.id, 60 * 60 * 24)
      });
    }
  }
}

export default SignUpController;
