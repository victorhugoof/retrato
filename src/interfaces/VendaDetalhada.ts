import {Venda} from "./Venda";
import {ItemVendaDetalhado} from "./ItemVendaDetalhado";

export class VendaDetalhada {

    venda_id: number;
    valor_total: number;
    quantidade_itens: number;
    data_cadastro: Date;
    itens: ItemVendaDetalhado[];

    constructor(venda: Venda,
                itensVenda: ItemVendaDetalhado[]) {

        this.venda_id = venda.id;
        this.data_cadastro = venda.data_cadastro;
        this.itens = (itensVenda || []);
        this.valor_total = this.itens.map(item => item.valor_total).reduce((previousValue, currentValue) => (previousValue || 0) + currentValue);
        this.quantidade_itens = this.itens.map(item => item.quantidade).reduce((previousValue, currentValue) => (previousValue || 0) + currentValue);
    }

}