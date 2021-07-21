class IndexController {
    static fetchWelcomeMessage(request, response)
    {
        return response.json(
            {
                message: 'Welcome to My Diary API',
                status: 'success'
            }
        );
    }
  }
  export default IndexController;