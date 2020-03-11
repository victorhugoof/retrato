import {model, Schema} from "mongoose";

export const TokenModel = model('Token', new Schema({
	accessToken: String,
	accessTokenExpiresAt: Date,
	refreshToken: String,
	refreshTokenExpiresAt: Date,
	client: Object,
	user: Object
}).index({"refreshTokenExpiresAt": 1}, {expireAfterSeconds: 0}));
