import {Request, Response} from 'express';
import {Message} from "../interfaces/Message";
import {ServiceFactory} from "../service/ServiceFactory";
import {i18n, Messages} from "../utils/i18n";

export class VendaController {

	public async create(request: Request, response: Response) {
		await ServiceFactory.getVendaService().create()
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

	public async delete(request: Request, response: Response) {
		const {id} = request.params;
		await ServiceFactory.getVendaService().delete(id)
			.then(() => response.send(new Message(i18n.getMessage(Messages.VENDA_EXCLUIDA_COM_SUCESSO))))
			.catch(reason => response.send(reason));
	}

	public async find(request: Request, response: Response) {
		const {id} = request.params;
		await ServiceFactory.getVendaService().find(id)
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

	public async findAll(request: Request, response: Response) {
		await ServiceFactory.getVendaService().findAll()
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

	public async findVendaDetalhada(request: Request, response: Response) {
		const {id} = request.params;
		await ServiceFactory.getVendaService().findVendaDetalhada(id)
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

}
