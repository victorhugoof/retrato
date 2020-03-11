import getNextId from "../helper/NextId";
import {VendaModel} from "../models/Venda";
import {Venda} from "../interfaces/Venda";
import {ServiceFactory} from "./ServiceFactory";
import {VendaDetalhada} from "../interfaces/VendaDetalhada";
import {getMessage, Messages} from "../helper/i18n";

export class VendaService {

	public async create(): Promise<Venda> {
		const id = await getNextId(VendaModel);
		return VendaModel.create({id});
	}

	public async delete(id): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const venda = await VendaModel.findOne({id});
			if (!venda) {
				reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
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
				reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
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
				reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO, e)));
			}
		});
	}
}
