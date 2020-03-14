import {Produto} from "../interfaces/Produto";
import {ProdutoModel} from "../models/Produto";
import getNextId from "../helper/NextId";
import {ServiceFactory} from "./ServiceFactory";
import {getMessage, Messages} from "../helper/i18n";
import {BusinessException} from "../helper/BusinessException";

export class ProdutoService {

	public async create(produto: Produto): Promise<Produto> {
		const id = await getNextId(ProdutoModel);
		return await ProdutoModel.create({
			id: id,
			codigo: produto.codigo,
			nome: produto.nome,
			valor: produto.valor
		});
	}

	public async update(id: number, produto: Produto): Promise<Produto> {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			const existe = await this.find(id);
			if (!existe) {
				return reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}

			await ProdutoModel.updateOne({id}, {
				codigo: produto.codigo,
				nome: produto.nome,
				valor: produto.valor
			}, (err, res) => {
				if (err) {
					return reject(err);
				}
				return resolve(res);
			});
			reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO)));
		});
	}

	public async delete(id: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			const existe = await this.find(id);
			if (!existe) {
				return reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}

			const possuiVenda = await ServiceFactory.getItemVendaService().existeItemVendaProduto(id);
			if (possuiVenda) {
				return reject(new BusinessException(getMessage(Messages.PRODUTO_POSSUI_VENDA)));
			}

			await ProdutoModel.deleteOne({id}, (err) => {
				if (err) {
					return reject(err);
				}
				return resolve();
			});
			reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO)));
		});
	}

	public async findAll(): Promise<Produto[]> {
		return ProdutoModel.find();
	}

	public async find(id: number): Promise<Produto> {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new BusinessException(getMessage(Messages.PARAMETROS_INVALIDOS)));
			}
			return resolve(await ProdutoModel.findOne({id}))
		});
	}
}
