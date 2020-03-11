import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {Messages} from "../utils/i18n";
import {toResponse} from "../utils/ToResponse";

export class VendaController {

	public async create(_req, response: Response) {
		await toResponse(ServiceFactory.getVendaService().create(), response);
	}

	public async delete(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getVendaService().delete(id), response, Messages.VENDA_EXCLUIDA_COM_SUCESSO);
	}

	public async find(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getVendaService().find(id), response);
	}

	public async findAll(_req, response: Response) {
		await toResponse(ServiceFactory.getVendaService().findAll(), response);
	}

	public async findVendaDetalhada(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getVendaService().findVendaDetalhada(id), response);
	}

}
