import {Router} from "express";
import {ProdutoRoutes} from "./ProdutoRoutes";

class Routes {
    public router = Router();
    constructor() {
        ProdutoRoutes.createRoutes(this.router);
    }
}

module.exports = new Routes().router;
