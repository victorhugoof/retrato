import {Response} from 'express';
import {getMessage, Messages} from "./i18n";
import {Message} from "../interfaces/Message";
import {BusinessException} from "./BusinessException";

export async function toResponse(promise: Promise<any>, response: Response, message?: Messages) {
	await promise
		.then(result => response.status(200).json(getResponseBody(result, message)))
		.catch(reason => {
			if (reason && (reason instanceof Message || reason instanceof BusinessException)) {
				response.status(400).json(reason);
			} else {
				response.status(500).json(reason || new Message(getMessage(Messages.ERRO_INESPERADO)));
			}
		});
}

function getResponseBody(result: any, message: Messages) {
	if (!result && message) {
		return new Message(getMessage(message));
	}
	return result;
}
