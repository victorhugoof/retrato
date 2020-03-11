import {model, Schema} from "mongoose";

export const ClientModel = model('Client', new Schema({
	id: String,
	clientId: String,
	clientSecret: String,
	grants: [String],
	redirectUris: [String]
}));
