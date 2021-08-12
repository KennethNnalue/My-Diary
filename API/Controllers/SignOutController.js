class SignOutController {
  static signOut(request, response) {
    response.cookie('token', null);

    return response.redirect('/login');
  }
}

export default SignOutController;
