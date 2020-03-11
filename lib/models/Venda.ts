import {model, Schema} from "mongoose";

export const VendaModel = model('Venda', new Schema({
	id: {
		type: Number,
		unique: true
	},
	data_cadastro: {
		type: Date,
		default: Date.now
	}
}));
