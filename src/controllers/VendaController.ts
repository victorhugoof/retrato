import {Request, Response} from 'express';
import {Message} from "../interfaces/Message";
import {ServiceFactory} from "../service/ServiceFactory";

export class VendaController {

    public async create(request: Request, response: Response) {
        await ServiceFactory.getVendaService().create()
            .then(result => response.send(result))
            .catch(reason => response.send(reason));
    }

    public async delete(request: Request, response: Response) {
        const {id} = request.params;
        await ServiceFactory.getVendaService().delete(id)
            .then(() => response.send(new Message('Venda excluída com sucesso!')))
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
