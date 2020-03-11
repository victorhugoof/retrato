import {Router} from "express";
import {ProdutoRoutes} from "./ProdutoRoutes";
import {VendaRoutes} from "./VendaRoutes";
import {ItemVendaRoutes} from "./ItemVendaRoutes";

export class Routes {

	public router = Router();

	constructor() {
		ProdutoRoutes.createRoutes(this.router);
		VendaRoutes.createRoutes(this.router);
		ItemVendaRoutes.createRoutes(this.router);
	}
}
