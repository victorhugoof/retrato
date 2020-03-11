import {Router} from "express";
import {VendaController} from "../controllers/VendaController";

export class VendaRoutes {

	public static createRoutes(router: Router): void {
		const controller = new VendaController();

		router.post('/venda/salvar', controller.create);
		router.delete('/venda/excluir/:id', controller.delete);
		router.get('/venda/:id', controller.find);
		router.get('/venda', controller.findAll);
		router.get('/venda/:id/detalhada', controller.findVendaDetalhada);
	}
}
