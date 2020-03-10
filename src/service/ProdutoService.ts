import {Produto} from "../interfaces/Produto";
import {ProdutoModel} from "../models/Produto";
import getNextId from "../utils/NextId";
import {Message} from "../interfaces/Message";
import {ServiceFactory} from "./ServiceFactory";

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
				reject(new Message('Produto não encontrado!'));
			}

			await ProdutoModel.update({id}, {
				codigo: produto.codigo,
				nome: produto.nome,
				valor: produto.valor
			}, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
			reject(new Message('Erro inesperado!'));
		});
	}

	public async delete(id): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const existe = await this.find({id});
			if (!existe) {
				reject(new Message('Produto não encontrado!'));
			}

			const permiteExcluir = await ServiceFactory.getItemVendaService().existeItemVendaProduto(id);
			if (!permiteExcluir) {
				reject(new Message('Produto possui venda!'));
			}

			await ProdutoModel.deleteOne({id}, (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
			reject(new Message('Erro inesperado!'));
		});
	}

	public async findAll(): Promise<Produto[]> {
		return ProdutoModel.find();
	}

	public async find(id): Promise<Produto> {
		return ProdutoModel.findOne({id});
	}
}
