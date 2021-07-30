import bcrypt from 'bcrypt-nodejs';
import models from '../models/index';
import createToken from '../security/createToken';

const { User } = models;

class SignInController {
  static async signIn(request, response) {
    const { email, password } = request.body;

    const userFound = await User.findOne({
      where: {
        email
      }
    }).catch((error) => response.status(500).json({
      message: 'Internal Sever Error',
      errorMessage: error.toString()
    }));

    const isUserFound = userFound && bcrypt.compareSync(password, userFound.password);
    if (!isUserFound) {
      return response.status(401).json({
        message: 'Invalid Email or Password'
      });
    }

    return response.status(200).json(
      {
        message: 'Your Signed In',
        token: createToken(userFound.id, 60 * 60 * 24)

      }
    );
  }
}
export default SignInController;
