import { success, notFound } from '../../services/response/'
import { Produto } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Produto.create(body)
    .then((produto) => produto.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Produto.find(query, select, cursor)
    .then((produtos) => produtos.map((produto) => produto.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Produto.findById(params.id)
    .then(notFound(res))
    .then((produto) => produto ? produto.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Produto.findById(params.id)
    .then(notFound(res))
    .then((produto) => produto ? Object.assign(produto, body).save() : null)
    .then((produto) => produto ? produto.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Produto.findById(params.id)
    .then(notFound(res))
    .then((produto) => produto ? produto.remove() : null)
    .then(success(res, 204))
    .catch(next)
