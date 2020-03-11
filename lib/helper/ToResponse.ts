import {Response} from 'express';
import {getMessage, Messages} from "./i18n";
import {Message} from "../interfaces/Message";

export async function toResponse(promise: Promise<any>, response: Response, message?: Messages) {
	await promise
		.then(result => response.status(200).send(getResponseBody(result, message)))
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
