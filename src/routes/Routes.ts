import {Router} from "express";
import {ProdutoRoutes} from "./ProdutoRoutes";
import {VendaRoutes} from "./VendaRoutes";
import {ItemVendaRoutes} from "./ItemVendaRoutes";
import {Message} from "../interfaces/Message";
import {i18n, Messages} from "../utils/i18n";

class Routes {

    public router = Router();

    constructor() {

        this.router.get('/', (req, res) => res.send(new Message(i18n.getMessage(Messages.OLA_MUNDO))));
        ProdutoRoutes.createRoutes(this.router);
        VendaRoutes.createRoutes(this.router);
        ItemVendaRoutes.createRoutes(this.router);
    }
}

module.exports = new Routes().router;
