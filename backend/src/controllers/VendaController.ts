import {Request, Response} from 'express';
import {Message} from "../interfaces/Message";
import Venda from "../models/Venda";
import getNextId from "../utils/NextId";

export class VendaController {

    public async create(request: Request, response: Response) {
        const id = await getNextId(Venda);
        await Venda.create({
            id
        }, (err, res) => {
            if (err) {
                return response.send(err);
            }
            return response.send(res);
        });
    }

    public async delete(request: Request, response: Response) {
        const {id} = request.params;

        const venda = await Venda.findOne({id});
        if (!venda) {
            return response.send(new Message('Venda não encontrada!'));
        }

        await Venda.deleteOne({id}, (err) => {
            if (err) {
                return response.send(err);
            }
            return response.send(new Message('Venda excluída com sucesso!'));
        });
    }

    public async find(request: Request, response: Response) {
        const {id} = request.params;

        const venda = await Venda.findOne({id});
        if (!venda) {
            return response.send(new Message('Venda não encontrada!'));
        }
        return response.send(venda);
    }

    public async findAll(request: Request, response: Response) {
        return response.send(await Venda.find());
    }

}
