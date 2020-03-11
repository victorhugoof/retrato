import {Response} from 'express';
import {i18n, Messages} from "./i18n";
import {Message} from "../interfaces/Message";

export async function toResponse(promise: Promise<any>, response: Response, message?: Messages) {
	await promise
		.then(result => response.status(200).send(getResponseBody(result, message)))
		.catch(reason => response.status(500).send(reason));
}

function getResponseBody(result: any, message: Messages) {
	if (!result && message) {
		return new Message(i18n.getMessage(message));
	}
	return result;
}
