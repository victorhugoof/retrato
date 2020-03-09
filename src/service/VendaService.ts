import getNextId from "../utils/NextId";
import {Message} from "../interfaces/Message";
import {VendaModel} from "../models/Venda";
import {Venda} from "../interfaces/Venda";
import {ServiceFactory} from "./ServiceFactory";
import {VendaDetalhada} from "../interfaces/VendaDetalhada";

export class VendaService {

    public async create(): Promise<Venda> {
        const id = await getNextId(VendaModel);
        return VendaModel.create({id});
    }

    public async delete(id): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const venda = await VendaModel.findOne({id});
            if (!venda) {
                reject(new Message('Venda não encontrada!'));
            }

            await ServiceFactory.getItemVendaService().deletaItensVenda(venda.id);
            await VendaModel.deleteOne({id}, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    public async find(id): Promise<Venda> {
        return new Promise(async (resolve, reject) => {
            const venda = await VendaModel.findOne({id});
            if (!venda) {
                reject(new Message('Venda não encontrada!'));
            }
            resolve(venda);
        });
    }

    public async findAll(): Promise<Venda[]> {
        return VendaModel.find();
    }

    public async findVendaDetalhada(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const venda = await this.find(id);
                const itens = await ServiceFactory.getItemVendaService().findItensVendaDetalhado(venda.id);
                resolve(new VendaDetalhada(venda, itens));
            } catch (e) {
                reject(e);
            }
        });
    }
}