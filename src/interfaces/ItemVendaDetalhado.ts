import {Produto} from "./Produto";
import {ItemVenda} from "./ItemVenda";

export class ItemVendaDetalhado {

	venda_id: number;
	quantidade: number;
	valor_unitario: number;
	valor_total: number;
	data_cadastro: Date;
	id_produto: number;
	codigo_produto: String;
	nome_produto: String;

	constructor(item: ItemVenda,
				produto: Produto) {
		this.venda_id = item.venda_id;
		this.quantidade = item.quantidade;
		this.valor_unitario = item.valor_unitario;
		this.valor_total = item.valor_unitario * item.quantidade;
		this.data_cadastro = item.data_cadastro;
		this.id_produto = produto.id;
		this.codigo_produto = produto.codigo;
		this.nome_produto = produto.nome;
	}
}
