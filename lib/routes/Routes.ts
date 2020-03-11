import {Router} from "express";
import {ProdutoRoutes} from "./ProdutoRoutes";
import {VendaRoutes} from "./VendaRoutes";
import {ItemVendaRoutes} from "./ItemVendaRoutes";
import {LoginRoutes} from "./LoginRoutes";

export class Routes {

	public router = Router();

	constructor() {
		LoginRoutes.createRoutes(this.router);
		ProdutoRoutes.createRoutes(this.router);
		VendaRoutes.createRoutes(this.router);
		ItemVendaRoutes.createRoutes(this.router);
	}
}
