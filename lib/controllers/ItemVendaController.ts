import {Request, Response} from 'express';
import {ServiceFactory} from "../service/ServiceFactory";
import {Messages} from "../helper/i18n";
import {toResponse} from "../helper/ToResponse";
import {toNumber} from "../helper/ToNumber";
import {validateRequest} from "../helper/ValidateRequest";

export class ItemVendaController {

	public async create(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			await toResponse(ServiceFactory.getItemVendaService().create(request.body), response);
		}
	}

	public async delete(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			const {id} = request.params;
			await toResponse(ServiceFactory.getItemVendaService().delete(toNumber(id)), response, Messages.REGISTRO_EXCLUIDO_COM_SUCESSO);
		}
	}

	public async findAll(request: Request, response: Response) {
		if (validateRequest(request, response)) {
			const {venda_id} = request.params;
			await toResponse(ServiceFactory.getItemVendaService().findAll(toNumber(venda_id)), response);
		}
	}

}
