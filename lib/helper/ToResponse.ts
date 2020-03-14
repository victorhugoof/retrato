import {Response} from 'express';
import {getMessage, Messages} from "./i18n";
import {Message} from "../interfaces/Message";
import {BusinessException} from "./BusinessException";

export async function toResponse(promise: Promise<any>, response: Response, message?: Messages) {
	await promise
		.then(result => response.status(200).json(getResponseBody(result, message)))
		.catch(reason => {
			let ret = new Message(getMessage(Messages.ERRO_INESPERADO));
			let statusCode = 500;
			if (reason) {
				if (reason instanceof Message) {
					ret = reason;
					statusCode = 400;
				} else if (reason instanceof BusinessException) {
					ret = new Message(reason.message);
					statusCode = 400;
				}
			}
			return response.status(statusCode).json(ret);
		});
}

function getResponseBody(result: any, message: Messages) {
	if (!result && message) {
		return new Message(getMessage(message));
	}
	return result;
}
