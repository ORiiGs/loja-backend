import { Produto } from '.'

let produto

beforeEach(async () => {
  produto = await Produto.create({ nome: 'test', preco: 'test', foto: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = produto.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(produto.id)
    expect(view.nome).toBe(produto.nome)
    expect(view.preco).toBe(produto.preco)
    expect(view.foto).toBe(produto.foto)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = produto.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(produto.id)
    expect(view.nome).toBe(produto.nome)
    expect(view.preco).toBe(produto.preco)
    expect(view.foto).toBe(produto.foto)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
