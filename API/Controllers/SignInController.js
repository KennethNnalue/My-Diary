import bcrypt from 'bcrypt-nodejs';
import models from '../models';
import createToken from '../security/createToken';

const { User } = models;

class SignInController {
  static async signIn(request, response) {
    try {
      const { email, password } = request.body;

      const userFound = await User.findOne({ where: { email } });

      const isUserFound = userFound && bcrypt.compareSync(password, userFound.password);

      if (isUserFound) {
        const token = createToken(userFound.id);
        response.cookie('token', token, { httpOnly: true });
        return response.json({
          message: 'you are signed in!',
        });
      }

      return response.status(401).json({
        message: 'Invalid email or password',
      });
    } catch (e) {
      return response.status(500).json({ error: e.toString() });
    }
  }
}

export default SignInController;
