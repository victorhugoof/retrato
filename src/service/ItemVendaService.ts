import getNextId from "../utils/NextId";
import {ItemVendaModel} from "../models/ItemVendaModel";
import {Message} from "../interfaces/Message";
import {ItemVenda} from "../interfaces/ItemVenda";
import {ItemVendaDetalhado} from "../interfaces/ItemVendaDetalhado";
import {ServiceFactory} from "./ServiceFactory";

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

	public async deletaItensVenda(venda_id: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await ItemVendaModel.deleteMany({venda_id}, err => err ? reject(err) : resolve());
			resolve();
		});
	}

	public async findItensVendaDetalhado(venda_id: number): Promise<ItemVendaDetalhado[]> {
		return new Promise(async (resolve, reject) => {
			try {
				const itens = await this.findAll(venda_id);
				const convert = await this.convert(itens);
				resolve(convert);
			} catch (e) {
				reject(e);
			}
		});
	}

	public async existeItemVendaProduto(produto_id: number): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			const produto = await ItemVendaModel.exists({produto_id}, err => {
				if (err) {
					reject(err);
				}
			});
			resolve(produto);
		});
	}

	private async convert(itens: ItemVenda[]): Promise<ItemVendaDetalhado[]> {
		return Promise.all(itens.map(async (item) => {
			const produto = await ServiceFactory.getProdutoService().find(item.produto_id);
			return new ItemVendaDetalhado(item, produto);
		}));
	}
}
