import Factory from '@ioc:Adonis/Lucid/Factory'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'
import Video from 'App/Models/Video'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}).build()
