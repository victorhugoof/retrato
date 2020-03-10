import {model, Schema} from "mongoose";

export const ProdutoModel = model('Produto', new Schema({
	id: {
		type: Number,
		unique: true
	},
	codigo: {
		type: String,
		required: 'Código é obrigatório',
		unique: true
	},
	nome: {
		type: String,
		required: 'Nome é obrigatório'
	},
	valor: {
		type: Number,
		required: 'Valor é obrigatório'
	},
	data_cadastro: {
		type: Date,
		default: Date.now
	}
}));
