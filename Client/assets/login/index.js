//  Remove innitial token before signIn
window.localStorage.removeItem('token');/**

 * get email from email field
 */
const getEmail = () => document.getElementById('email').value;

/** *
  * get password from password field
  */
const getPassword = () => document.getElementById('password').value;

/**
  * Fetch login button
  */
const loginButton = document.getElementById('loginButton');

const loginUser = async (event) => {
  event.preventDefault();
  /**
   *
   * get email
   */
  const email = getEmail();

  /** *
    * get password
    */
  const password = getPassword();

  /**
      * call our login API
      */

  const response = await fetch(`${window.location.origin}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const result = await response.json();

//   console.table(result, '>>>>>this is my result from API');

  if (response.status === 422) {
    /**
        * User has made mistake in input & we will bounce him back
        */
    cuteAlert({
      type: 'error',
      title: 'Input Error!',
      message: 'Please enter a valid email and password',
      buttonText: 'Okay'
    });
  }

  if (response.status === 401) {
    cuteToast({
      type: 'error', // or 'info', 'error', 'warning'
      message: result.message,
      timer: 5000
    });
  }

  if (response.status === 200) {
    cuteToast({
      type: 'success', // or 'info', 'error', 'warning'
      message: result.message,
      timer: 50000
    });

    window.localStorage.setItem('token', result.token);

    // redirect user to dashboard
    window.location.href = '/dashboard';
  }
};

/**
  * Make login button respond to our needs
  */
loginButton.addEventListener('click', loginUser);
