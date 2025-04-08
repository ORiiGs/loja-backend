import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Produto } from '.'

const app = () => express(apiRoot, routes)

let produto

beforeEach(async () => {
  produto = await Produto.create({})
})

test('POST /produtos 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ nome: 'test', preco: 'test', foto: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nome).toEqual('test')
  expect(body.preco).toEqual('test')
  expect(body.foto).toEqual('test')
})

test('GET /produtos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /produtos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${produto.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(produto.id)
})

test('GET /produtos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /produtos/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${produto.id}`)
    .send({ nome: 'test', preco: 'test', foto: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(produto.id)
  expect(body.nome).toEqual('test')
  expect(body.preco).toEqual('test')
  expect(body.foto).toEqual('test')
})

test('PUT /produtos/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ nome: 'test', preco: 'test', foto: 'test' })
  expect(status).toBe(404)
})

test('DELETE /produtos/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${produto.id}`)
  expect(status).toBe(204)
})

test('DELETE /produtos/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
