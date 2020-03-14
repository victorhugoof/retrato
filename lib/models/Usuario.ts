import {model, Schema} from "mongoose";

export const UsuarioModel = model('Usuario', new Schema({
	usuario: String,
	senha: String
}));
