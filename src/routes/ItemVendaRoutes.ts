import {Router} from "express";
import {ItemVendaController} from "../controllers/ItemVendaController";

export class ItemVendaRoutes {

	public static createRoutes(router: Router): void {
		const controller = new ItemVendaController();

		router.post('/venda/itens/salvar', controller.create);
		router.delete('/venda/itens/excluir/:id', controller.delete);
		router.get('/venda/:venda_id/itens', controller.findAll);
	}
}
