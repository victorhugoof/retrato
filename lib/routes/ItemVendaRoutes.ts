import {Router} from "express";
import {ItemVendaController} from "../controllers/ItemVendaController";
import {param} from "express-validator";

export class ItemVendaRoutes {

	public static createRoutes(router: Router): void {
		const controller = new ItemVendaController();

		router.post('/venda/itens/salvar', controller.create);
		router.delete('/venda/itens/excluir/:id', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.delete);
		router.get('/venda/:venda_id/itens', [param('venda_id', 'Venda Id é obrigatório').notEmpty().isNumeric()], controller.findAll);
	}
}
