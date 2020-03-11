import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {Messages} from "../utils/i18n";
import {toResponse} from "../utils/ToResponse";

export class ProdutoController {

	public async create(request: Request, response: Response) {
		await toResponse(ServiceFactory.getProdutoService().create(request.body), response);
	}

	public async update(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getProdutoService().update(id, request.body), response);
	}

	public async delete(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getProdutoService().delete(id), response, Messages.PRODUTO_EXCLUIDO_COM_SUCESSO);
	}

	public async find(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getProdutoService().find(id), response);
	}

	public async findAll(_req, response: Response) {
		await toResponse(ServiceFactory.getProdutoService().findAll(), response);
	}

}
