import {model, Schema} from "mongoose";

const ProdutoSchema = new Schema({
    nome: {
        type: String,
        required: 'Nome do produto é obrigatório'
    },
    valor: {
        type: Number,
        required: 'Valor do produto é obrigatório'
    },
    data_cadastro: {
        type: Date,
        default: Date.now
    }
});
export default model('Produto', ProdutoSchema);
