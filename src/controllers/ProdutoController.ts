import {Request, Response} from 'express';
import {Message} from "../interfaces/Message";
import {ServiceFactory} from "../service/ServiceFactory";
import {i18n, Messages} from "../utils/i18n";

export class ProdutoController {

	public async create(request: Request, response: Response) {
		await ServiceFactory.getProdutoService().create(request.body)
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

	public async update(request: Request, response: Response) {
		const {id} = request.params;
		await ServiceFactory.getProdutoService().update(id, request.body)
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

	public async delete(request: Request, response: Response) {
		const {id} = request.params;
		await ServiceFactory.getProdutoService().delete(id)
			.then(() => response.send(new Message(i18n.getMessage(Messages.PRODUTO_EXCLUIDO_COM_SUCESSO))))
			.catch(reason => response.send(reason));
	}

	public async find(request: Request, response: Response) {
		const {id} = request.params;
		await ServiceFactory.getProdutoService().find(id)
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

	public async findAll(_req, response: Response) {
		await ServiceFactory.getProdutoService().findAll()
			.then(result => response.send(result))
			.catch(reason => response.send(reason));
	}

}
