import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Produto, { schema } from './model'

const router = new Router()
const { nome, preco, foto } = schema.tree

/**
 * @api {post} /produtos Create produto
 * @apiName CreateProduto
 * @apiGroup Produto
 * @apiParam nome Produto's nome.
 * @apiParam preco Produto's preco.
 * @apiParam foto Produto's foto.
 * @apiSuccess {Object} produto Produto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Produto not found.
 */
router.post('/',
  body({ nome, preco, foto }),
  create)

/**
 * @api {get} /produtos Retrieve produtos
 * @apiName RetrieveProdutos
 * @apiGroup Produto
 * @apiUse listParams
 * @apiSuccess {Object[]} produtos List of produtos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /produtos/:id Retrieve produto
 * @apiName RetrieveProduto
 * @apiGroup Produto
 * @apiSuccess {Object} produto Produto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Produto not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /produtos/:id Update produto
 * @apiName UpdateProduto
 * @apiGroup Produto
 * @apiParam nome Produto's nome.
 * @apiParam preco Produto's preco.
 * @apiParam foto Produto's foto.
 * @apiSuccess {Object} produto Produto's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Produto not found.
 */
router.put('/:id',
  body({ nome, preco, foto }),
  update)

/**
 * @api {delete} /produtos/:id Delete produto
 * @apiName DeleteProduto
 * @apiGroup Produto
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Produto not found.
 */
router.delete('/:id',
  destroy)

export default router
