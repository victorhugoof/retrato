import {model, Schema} from "mongoose";

export const UsuarioModel = model('UsuarioModel', new Schema({
	usuario: String,
	senha: String
}));
