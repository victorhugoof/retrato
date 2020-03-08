import {model, Schema} from "mongoose";

export const ItemVendaSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    venda_id: {
        type: Number,
        required: 'Venda é obrigatório'
    },
    seq_item: {
        type: Number,
        required: 'Venda é obrigatório'
    },
    produto_id: {
        type: Number,
        required: 'Produto é obrigatório',
    },
    valor_unitario: {
        type: Number,
        required: 'Valor é obrigatório'
    },
    quantidade: {
        type: Number,
        required: 'Quantidade é obrigatório'
    },
    data_cadastro: {
        type: Date,
        default: Date.now
    }
});
export default model('ItemVenda', ItemVendaSchema);
