import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

test.group('User', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should create a user', async ({ client, assert }) => {
    const response = await client
      .post('/v1/users/register')
      .json({ email: 'exemple@mail.com', password: '123abc' })

    response.assertStatus(201)

    const newUser = await User.findBy('email', 'exemple@mail.com')
    assert.isNotNull(newUser)
  })

  test('Should login a user', async ({ client, assert }) => {
    const user = await UserFactory.merge({ password: '123abc' }).create()

    const response = await client
      .post('/v1/users/login')
      .json({ email: user.email, password: '123abc' })

    response.assertStatus(200)
  })
})
