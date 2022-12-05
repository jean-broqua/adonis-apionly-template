import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Tag from './Tag'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relations

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>
}
