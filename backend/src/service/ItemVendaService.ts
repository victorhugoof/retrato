import getNextId from "../utils/NextId";
import {ItemVendaModel} from "../models/ItemVendaModel";
import {Message} from "../interfaces/Message";
import {ItemVenda} from "../interfaces/ItemVenda";

export class ItemVendaService {

    private static async getNextSeqItemVenda(venda_id: number): Promise<number> {
        const ultimoItemVenda = await ItemVendaModel.findOne({venda_id}).sort({seq_item: -1});
        let codigo = 0;
        if (ultimoItemVenda) {
            codigo = ultimoItemVenda['seq_item'];
        }
        return codigo + 1;
    }

    public async create(item: ItemVenda): Promise<ItemVenda> {

        const seq_item = await ItemVendaService.getNextSeqItemVenda(item.venda_id);
        const id = await getNextId(ItemVendaModel);

        return ItemVendaModel.create({
            id: id,
            venda_id: item.venda_id,
            seq_item: seq_item,
            produto_id: item.produto_id,
            valor_unitario: item.valor_unitario,
            quantidade: item.quantidade
        });
    }

    public async delete(id): Promise<void> {

        return new Promise(async (resolve, reject) => {
            const item = await ItemVendaModel.findOne({id});
            if (!item) {
                reject(new Message('Item não encontrado!'));
            }

            await ItemVendaModel.deleteOne({id}, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
            reject(new Message('Erro inesperado'));
        });
    }

    public async findAll(venda_id): Promise<ItemVenda[]> {
        return ItemVendaModel.find({venda_id});
    }
}