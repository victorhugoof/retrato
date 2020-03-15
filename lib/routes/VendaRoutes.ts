import {Router} from "express";
import {VendaController} from "../controllers/VendaController";
import {param} from "express-validator";

export class VendaRoutes {

	public static createRoutes(router: Router): void {
		const controller = new VendaController();

		router.post('/venda/salvar', controller.create);
		router.delete('/venda/excluir/:id', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.delete);
		router.get('/venda/:id', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.find);
		router.get('/venda', controller.findAll);
		router.get('/venda/:id/detalhada', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.findVendaDetalhada);
	}
}
