// get Name value from form
const getName = () => document.getElementById('name').value;

// get email value from form
const getEmail = () => document.getElementById('email').value;

// get password value from form
const getPassword = () => document.getElementById('password').value;

// fetch signUp button from form

const signupButton = document.getElementById('signupButton');

// Let's prevent signUpUser button to stop default refreshing
// our page when called
const signupUser = async (event) => {
  event.preventDefault();

  //   get name
  const name = getName();

  // get email
  const email = getEmail();

  // get password
  const password = getPassword();

  // call our SignUp API to handle our SignUp request
  const response = await fetch(`${window.location.origin}/api/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    })

  });
  // put our response into JSON and asign it to a new constant called result
  const result = await response.json();

  //  response from API inside the signUpUser funtion starts here!

  if (response.status === 422) {
    const emailErrorMessage = result.errors.email;
    const passwordErrorMessage = result.errors.password;
    const nameErrorMessage = result.errors.name;
    const choosenError = nameErrorMessage || emailErrorMessage || passwordErrorMessage;

    // This means user did not fill the form and we do not accept empty fileds
    // We should call CuteAlert and tell user to enter valid details
    cuteAlert({
      type: 'error',
      title: 'Error!',
      message: choosenError[0].message,
      buttonText: 'Okay'
    });
  }

  if (response.status === 201) {
    cuteToast({
      type: 'success', // or 'info', 'error', 'warning'
      message: result.message,
      timer: 50000
    });
    // Store the token in the local browser
    window.localStorage.setItem('token', result.token);

    // redirect user to dashboard
    window.location.href = '/dashboard';
  }
};

/**
  * Make signup button respond to our needs
  */
signupButton.addEventListener('click', signupUser);
