import {TokenModel} from "../models/Token";
import {ClientModel} from "../models/Client";
import {UsuarioModel} from "../models/Usuario";
import {Usuario} from "../interfaces/Usuario";
import {Client} from "../interfaces/Client";

class Oauth {

	static async getClient(clientId, clientSecret, callback) {
		await ClientModel.findOne({
			clientId: clientId,
			clientSecret: clientSecret
		}).lean().exec(((callback, err, client) => callback(err, client)).bind(null, callback));
	};

	static async getUser(username, password, callback) {
		await UsuarioModel.findOne({
			usuario: username,
			senha: password
		}).lean().exec(((callback, err, user) => callback(err, user)).bind(null, callback));
	};

	static async getAccessToken(token, callback) {
		await TokenModel.findOne({
			accessToken: token
		}).lean().exec(((callback, err, token) => callback(err, token)).bind(null, callback));
	};

	static async getRefreshToken(refreshToken, callback) {
		await TokenModel.findOne({
			refreshToken: refreshToken
		}).lean().exec(((callback, err, token) => callback(err, token)).bind(null, callback));
	};

	static async saveToken(token, client: Client, user: Usuario, callback) {

		token.client = {
			id: client.clientId,
			aqui_va_info: 'ok'
		};

		token.user = {
			username: user.usuario,
			aqui_va_info: 'sla'
		};

		await new TokenModel(token).save(((callback, err, token) => {
			if (!token) {
				console.error('Token not saved');
			} else {
				token = token.toObject();
				delete token._id;
				delete token.__v;
			}
			callback(err, token);
		}).bind(null, callback));
	};

	static async revokeToken(token, callback) {
		await TokenModel.deleteOne({
			refreshToken: token.refreshToken
		}).exec(((callback, err, results) => callback(err, (results && results.deletedCount === 1))).bind(null, callback));
	};

	static async loadDefaultData() {
		const client = await ClientModel.findOne({id: 'retrato'});
		if (!client) {
			await new ClientModel({
				id: 'retrato',
				clientId: 'retrato',
				clientSecret: 'rEtR@T0d@M0d@',
				grants: ['password', 'refresh_token'],
				redirectUris: []
			}).save();
		}

		const usuario = await UsuarioModel.findOne({usuario: 'admin'});
		if (!usuario) {
			await new UsuarioModel({
				usuario: 'admin',
				senha: 'admin'
			}).save();
		}
	};
}

module.exports = {
	getAccessToken: Oauth.getAccessToken,
	getClient: Oauth.getClient,
	saveToken: Oauth.saveToken,
	getUser: Oauth.getUser,
	getRefreshToken: Oauth.getRefreshToken,
	revokeToken: Oauth.revokeToken,
	loadDefaultData: Oauth.loadDefaultData
};
