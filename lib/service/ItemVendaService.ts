import getNextId from "../helper/NextId";
import {ItemVendaModel} from "../models/ItemVendaModel";
import {ItemVenda} from "../interfaces/ItemVenda";
import {ItemVendaDetalhado} from "../interfaces/ItemVendaDetalhado";
import {ServiceFactory} from "./ServiceFactory";
import {getMessage, Messages} from "../helper/i18n";
import {BusinessException} from "../helper/BusinessException";

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

	public async delete(id: number): Promise<void> {

		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			const item = await ItemVendaModel.findOne({id});
			if (!item) {
				return reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}

			await ItemVendaModel.deleteOne({id}, (err) => {
				if (err) {
					return reject(err);
				}
				return resolve();
			});
			return reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO)));
		});
	}

	public async findAll(venda_id: number): Promise<ItemVenda[]> {
		return new Promise(async (resolve, reject) => {
			if (!venda_id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			return resolve(await ItemVendaModel.find({venda_id}))
		});
	}

	public async deletaItensVenda(venda_id: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if (!venda_id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			await ItemVendaModel.deleteMany({venda_id}, err => err ? reject(err) : resolve());
			return resolve();
		});
	}

	public async findItensVendaDetalhado(venda_id: number): Promise<ItemVendaDetalhado[]> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!venda_id) {
					return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
				}
				const itens = await this.findAll(venda_id);
				const convert = await this.convert(itens);
				return resolve(convert);
			} catch (e) {
				return reject(e);
			}
		});
	}

	public async existeItemVendaProduto(produto_id: number): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			if (!produto_id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			const produto = await ItemVendaModel.exists({produto_id}, err => {
				if (err) {
					return reject(err);
				}
			});
			return resolve(produto || false);
		});
	}

	private async convert(itens: ItemVenda[]): Promise<ItemVendaDetalhado[]> {
		return Promise.all(itens.map(async (item) => {
			const produto = await ServiceFactory.getProdutoService().find(item.produto_id);
			return new ItemVendaDetalhado(item, produto);
		}));
	}
}
