import { validationResult } from 'express-validator';
import models from '../models';
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

  static getResponse(isApi, response) {
    if (isApi) {
      return response.status(401).json({
        message: 'Not authorized!, Invalid credentials',
      });
    }
    return response.redirect('/login');
  }

  static blockInvasion(request, response, next) {
    const tokenInBrowser = request.cookies.token;
    const isApi = request.path.includes('api');

    if (!tokenInBrowser) {
      return Gate.getResponse(isApi, response);
    }

    try {
      request.userWallet = decodeToken(tokenInBrowser);
      return next();
    } catch (e) {
      return Gate.getResponse(isApi, response);
    }
  }

  static async blockAccessToAnotherUserResource(request, response, next) {
    try {
      const [result] = await models.sequelize.query(
        'SELECT * FROM "Memories" WHERE id = :memoryId AND "userId" = :userId',
        {
          replacements: { memoryId: request.params.id, userId: request.userWallet.userId },
        }
      );

      if (!result[0]) {
        return response.status(403).json({
          message: 'You don\'t have access to this resource'
        });
      }
      request.resourceBag = result;

      return next();
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error', error: error.toString()
      });
    }
  }
}

export default Gate;
