import {Venda} from "./Venda";
import {ItemVenda} from "./ItemVenda";

export class VendaDetalhada {

    public venda_id: number;
    public valor_total: number;
    public quantidade_itens: number;
    public data_cadastro: Date;
    public itens: ItemVenda[];

    constructor(private venda: Venda,
                private itensVenda: ItemVenda[]) {

        this.venda_id = venda.id;
        this.data_cadastro = venda.data_cadastro;
        this.itens = (itensVenda || []);
        this.valor_total = this.itensVenda.map(item => item.valor_unitario * item.quantidade).reduce((previousValue, currentValue) => (previousValue || 0) + currentValue);
        this.quantidade_itens = this.itensVenda.map(item => item.quantidade).reduce((previousValue, currentValue) => (previousValue || 0) + currentValue);
    }

}