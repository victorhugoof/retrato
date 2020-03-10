import {Request, Response} from 'express';
import {Message} from "../interfaces/Message";
import {ServiceFactory} from "../service/ServiceFactory";
import {i18n, Messages} from "../utils/i18n";

export class ItemVendaController {

    public async create(request: Request, response: Response) {
        await ServiceFactory.getItemVendaService().create(request.body)
            .then(result => response.send(result))
            .catch(reason => response.send(reason));
    }

    public async delete(request: Request, response: Response) {
        const {id} = request.params;
        await ServiceFactory.getItemVendaService().delete(id)
            .then(() => response.send(new Message(i18n.getMessage(Messages.ITEM_EXCLUIDO_COM_SUCESSO))))
            .catch(reason => response.send(reason));
    }

    public async findAll(request: Request, response: Response) {
        const {venda_id} = request.params;
        await ServiceFactory.getItemVendaService().findAll(venda_id)
            .then(result => response.send(result))
            .catch(reason => response.send(reason));
    }

}
