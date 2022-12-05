import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const registerSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    })

    const { email, password } = await request.validate({ schema: registerSchema })

    try {
      const newUser = await User.create({ email, password })
      return response.created({ message: 'User Created', email: newUser.email })
    } catch (error) {}
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    })

    const { email, password } = await request.validate({ schema: loginSchema })

    try {
      const login = await auth.use('api').attempt(email, password)
      return response.ok({ token: 'Bearer ' + login.token })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
