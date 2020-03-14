import getNextId from "../helper/NextId";
import {VendaModel} from "../models/Venda";
import {Venda} from "../interfaces/Venda";
import {ServiceFactory} from "./ServiceFactory";
import {VendaDetalhada} from "../interfaces/VendaDetalhada";
import {getMessage, Messages} from "../helper/i18n";
import {BusinessException} from "../helper/BusinessException";

export class VendaService {

	public async create(): Promise<Venda> {
		const id = await getNextId(VendaModel);
		return VendaModel.create({id});
	}

	public async delete(id: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			const venda = await VendaModel.findOne({id});
			if (!venda) {
				return reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}

			await ServiceFactory.getItemVendaService().deletaItensVenda(venda.id);
			await VendaModel.deleteOne({id}, (err) => {
				if (err) {
					return reject(err);
				}
				return resolve();
			});
		});
	}

	public async find(id: number): Promise<Venda> {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			const venda = await VendaModel.findOne({id});
			if (!venda) {
				return reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}
			return resolve(venda);
		});
	}

	public async findAll(): Promise<Venda[]> {
		return VendaModel.find();
	}

	public async findVendaDetalhada(id: number) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			try {
				const venda = await this.find(id);
				const itens = await ServiceFactory.getItemVendaService().findItensVendaDetalhado(venda.id);
				return resolve(new VendaDetalhada(venda, itens));
			} catch (e) {
				console.error(e);
				return reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO, e)));
			}
		});
	}
}
