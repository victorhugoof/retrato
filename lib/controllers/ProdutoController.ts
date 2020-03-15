import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {Messages} from "../helper/i18n";
import {toResponse} from "../helper/ToResponse";
import {toNumber} from "../helper/ToNumber";
import {validateRequest} from "../helper/ValidateRequest";

export class ProdutoController {

	public async create(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			await toResponse(ServiceFactory.getProdutoService().create(request.body), response);
		}
	}

	public async update(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			const {id} = request.params;
			await toResponse(ServiceFactory.getProdutoService().update(toNumber(id), request.body), response);
		}
	}

	public async delete(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			const {id} = request.params;
			await toResponse(ServiceFactory.getProdutoService().delete(toNumber(id)), response, Messages.REGISTRO_EXCLUIDO_COM_SUCESSO);
		}
	}

	public async find(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			const {id} = request.params;
			await toResponse(ServiceFactory.getProdutoService().find(toNumber(id)), response);
		}
	}

	public async findAll(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			await toResponse(ServiceFactory.getProdutoService().findAll(), response);
		}
	}

}
