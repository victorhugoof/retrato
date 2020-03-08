import {Router} from "express";
import {ProdutoRoutes} from "./ProdutoRoutes";
import {VendaRoutes} from "./VendaRoutes";
import {ItemVendaRoutes} from "./ItemVendaRoutes";

class Routes {
    public router = Router();

    constructor() {
        ProdutoRoutes.createRoutes(this.router, '/produto');
        VendaRoutes.createRoutes(this.router, '/venda');
        ItemVendaRoutes.createRoutes(this.router, '/venda/itens');
    }
}

module.exports = new Routes().router;
