import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {Messages} from "../helper/i18n";
import {toResponse} from "../helper/ToResponse";

export class ItemVendaController {

	public async create(request: Request, response: Response) {
		await toResponse(ServiceFactory.getItemVendaService().create(request.body), response);
	}

	public async delete(request: Request, response: Response) {
		const {id} = request.params;
		await toResponse(ServiceFactory.getItemVendaService().delete(id), response, Messages.REGISTRO_EXCLUIDO_COM_SUCESSO);
	}

	public async findAll(request: Request, response: Response) {
		const {venda_id} = request.params;
		await toResponse(ServiceFactory.getItemVendaService().findAll(venda_id), response);
	}

}
