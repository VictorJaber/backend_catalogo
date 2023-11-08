import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const data = request.only(['user', 'email', 'password']) as {
      user: string
      email: string
      password: string
    }

    const user = new User()
    user.user = data.user
    user.email = data.email

    user.password = await Hash.make(data.password)

    await user.save()

    return user
  }
}
