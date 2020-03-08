import {Request, Response} from 'express';
import {Message} from "../interfaces/Message";
import ItemVenda from "../models/ItemVenda";
import getNextId from "../utils/NextId";

export class ItemVendaController {

    private static async getNextSeqItemVenda(venda_id: number): Promise<number> {
        const ultimoItemVenda = await ItemVenda.findOne({venda_id}).sort({seq_item: -1});
        let codigo = 0;
        if (ultimoItemVenda) {
            codigo = ultimoItemVenda['seq_item'];
        }
        return codigo + 1;
    }

    public async create(request: Request, response: Response) {

        const {venda_id, produto_id, valor_unitario, quantidade} = request.body;
        const seq_item = await ItemVendaController.getNextSeqItemVenda(venda_id);
        const id = await getNextId(ItemVenda);

        await ItemVenda.create({
            id,
            venda_id,
            produto_id,
            valor_unitario,
            quantidade,
            seq_item
        }, (err, res) => {
            if (err) {
                return response.send(err);
            }
            return response.send(res);
        });
    }

    public async delete(request: Request, response: Response) {
        const {id} = request.params;

        const item = await ItemVenda.findOne({id});
        if (!item) {
            return response.send(new Message('Item não encontrado!'));
        }

        await ItemVenda.deleteOne({id}, (err) => {
            if (err) {
                return response.send(err);
            }
            return response.send(new Message('Item excluído com sucesso!'));
        });
    }

    public async findAll(request: Request, response: Response) {
        const {venda_id} = request.params;
        return response.send(await ItemVenda.find({venda_id}));
    }

}
