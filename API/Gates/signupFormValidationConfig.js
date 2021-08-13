import isEmail from 'validator/lib/isEmail';
import models from '../models';

const { User } = models;
const signupFormValidationConfig = {
  email: {
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    custom: {
      options: async (value) => {
        let existingUser = null;
        if (isEmail(value)) {
          existingUser = await User.findOne({ where: { email: value } });
        }
        if (existingUser) return Promise.reject(new Error('email already exists'));
        return Promise.resolve();
      }
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Please enter password',
    },
    isLength: {
      errorMessage: 'Your password must be at least 8 characters',
      options: { min: 8 }
    },
    custom: {
      options: (value) => {
        if (!(/^((?=.*\d))(?=.*[a-zA-Z])/.test(value))) {
          return Promise.reject(new Error('Your password must contain a letter and a number'));
        }
        if (!(/^\S*$/.test(value))) return Promise.reject(new Error('Your password must not contain space'));
        return Promise.resolve();
      }
    }
  },
  name: {
    notEmpty: {
      errorMessage: 'Please provide a name',
    },
    isAlpha: {
      errorMessage: 'Name must contain only letters',
    },
    custom: {
      options: (value) => {
        if (value && value.length < 3) return Promise.reject(new Error('name is too short'));
        if (value && value.length > 20) return Promise.reject(new Error('name is too long'));
        return Promise.resolve();
      }
    }
  },
};
export default signupFormValidationConfig;
