import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { v4 as uuidv4 } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export default class PostsController {
  private validationOption = {
    types: ['image'],
    size: '5mb',
  }

  public async index({}: HttpContextContract) {
    const post = await Post.all()
    return {
      data: post,
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const photo = request.file('photo', this.validationOption)

    if (photo) {
      const photoName = `${uuidv4()}.${photo.extname}`
      await photo.move(Application.tmpPath('uploads'), {
        name: photoName,
      })
      body.photo = photoName
    }

    const post = await Post.create(body)

    response.status(201)

    return {
      message: 'Momento criado com sucesso',
      data: post,
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      return {
        data: post,
      }
    } catch (error) {
      return response.status(404).json({
        message: 'Post não encontrado',
        error: error.message,
      })
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
