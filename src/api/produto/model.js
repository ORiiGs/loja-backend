import mongoose, { Schema } from 'mongoose'

const produtoSchema = new Schema({
  nome: {
    type: String
  },
  preco: {
    type: String
  },
  foto: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

produtoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      foto: this.foto,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Produto', produtoSchema)

export const schema = model.schema
export default model
