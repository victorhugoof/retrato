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

	public async update(id, produto: Produto): Promise<Produto> {
		return new Promise(async (resolve, reject) => {
			const existe = await this.find({id});
			if (!existe) {
				reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}

			await ProdutoModel.updateOne({id}, {
				codigo: produto.codigo,
				nome: produto.nome,
				valor: produto.valor
			}, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
			reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO)));
		});
	}

	public async delete(id): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const existe = await this.find({id});
			if (!existe) {
				reject(new BusinessException(getMessage(Messages.REGISTRO_NAO_ENCONTRADO)));
			}

			const permiteExcluir = await ServiceFactory.getItemVendaService().existeItemVendaProduto(id);
			if (!permiteExcluir) {
				reject(new BusinessException(getMessage(Messages.PRODUTO_POSSUI_VENDA)));
			}

			await ProdutoModel.deleteOne({id}, (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
			reject(new BusinessException(getMessage(Messages.ERRO_INESPERADO)));
		});
	}

	public async findAll(): Promise<Produto[]> {
		return ProdutoModel.find();
	}

	public async find(id): Promise<Produto> {
		return ProdutoModel.findOne({id});
	}
}
