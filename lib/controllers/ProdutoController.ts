import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {getMessage, Messages} from "../helper/i18n";
import {toResponse} from "../helper/ToResponse";
import {Message} from "../interfaces/Message";
import {toNumber} from "../helper/ToNumber";

export class ProdutoController {

	public async create(request: Request, response: Response) {
		try {
			await toResponse(ServiceFactory.getProdutoService().create(request.body), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async update(request: Request, response: Response) {
		try {
			const {id} = request.params;
			await toResponse(ServiceFactory.getProdutoService().update(toNumber(id), request.body), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async delete(request: Request, response: Response) {
		try {
			const {id} = request.params;
			await toResponse(ServiceFactory.getProdutoService().delete(toNumber(id)), response, Messages.REGISTRO_EXCLUIDO_COM_SUCESSO);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async find(request: Request, response: Response) {
		try {
			const {id} = request.params;
			await toResponse(ServiceFactory.getProdutoService().find(toNumber(id)), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async findAll(_req, response: Response) {
		try {
			await toResponse(ServiceFactory.getProdutoService().findAll(), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

}
