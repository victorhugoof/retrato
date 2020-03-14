import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {getMessage, Messages} from "../helper/i18n";
import {toResponse} from "../helper/ToResponse";
import {Message} from "../interfaces/Message";
import {toNumber} from "../helper/ToNumber";

export class VendaController {

	public async create(_req, response: Response) {
		try {
			await toResponse(ServiceFactory.getVendaService().create(), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async delete(request: Request, response: Response) {
		try {
			const {id} = request.params;
			await toResponse(ServiceFactory.getVendaService().delete(toNumber(id)), response, Messages.REGISTRO_EXCLUIDO_COM_SUCESSO);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async find(request: Request, response: Response) {
		try {
			const {id} = request.params;
			await toResponse(ServiceFactory.getVendaService().find(toNumber(id)), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async findAll(_req, response: Response) {
		try {
			await toResponse(ServiceFactory.getVendaService().findAll(), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

	public async findVendaDetalhada(request: Request, response: Response) {
		try {
			const {id} = request.params;
			await toResponse(ServiceFactory.getVendaService().findVendaDetalhada(toNumber(id)), response);
		} catch (e) {
			console.error(e);
			response.status(500).json(e || new Message(getMessage(Messages.ERRO_INESPERADO)));
		}
	}

}
