import Route from '@ioc:Adonis/Core/Route'

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    console.log('Attempting login with:', email, password) // Registro para verificar os dados recebidos

    const token = await auth.use('api').attempt(email, password)
    console.log('Token generated:', token) // Registro para verificar o token gerado
    return token
  } catch (error) {
    console.error('Authentication error:', error.message) // Registro para verificar erros de autenticação
    return response.unauthorized('Invalid credentials')
  }
})

Route.post('/users', 'UsersController.store')

Route.resource('/post', 'PostsController')
