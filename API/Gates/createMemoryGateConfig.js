import isURL from 'validator/lib/isURL';

const createMemoryGateConfig = {
  title: {
    notEmpty: {
      errorMessage: 'Please enter a title',
    },
    isLength: {
      errorMessage: 'Title should not be more than 100 characters',
      options: { max: 100 },
    },
  },

  story: {
    notEmpty: {
      errorMessage: 'Please tell a story',
    },
  },

  picture: {
    custom: {
      errorMessage: 'Please enter a valid url',
      options: (value) => (value ? isURL(value) : true)
    },
  },

  mood: {
    notEmpty: {
      errorMessage: 'Please enter a valid mood',
    },
    custom: {
      errorMessage: 'Please select a predefined mood, [happy, sad, excited]',
      options: (value) => ['happy', 'sad', 'excited'].includes(value),
    },
  },
};

export default createMemoryGateConfig;