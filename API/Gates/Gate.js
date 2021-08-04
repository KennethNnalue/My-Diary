import { validationResult } from 'express-validator';
import formatErrors from '../Helpers/formatErrors';
import decodeToken from '../security/decodeToken';

class Gate {
  static collectErrors(request, response, next) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({
        errors: formatErrors(errors)
      });
    }
    return next();
  }

  static blockInvasion(request, response, next) {
    const tokenInBrowser = request.headers.authorization;

    if (!tokenInBrowser) {
      return response.status(401).json({
        message: 'Not authorized!, No credentials',
      });
    }

    try {
      request.userWallet = decodeToken(tokenInBrowser);
      return next();
    } catch (e) {
      return response.status(401).json({
        message: 'Not authorized!, Invalid credentials',
      });
    }
  }
}

export default Gate;
