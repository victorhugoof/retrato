import {Router} from "express";
import {ProdutoController} from "../controllers/ProdutoController";
import {param} from "express-validator";

export class ProdutoRoutes {

	public static createRoutes(router: Router): void {
		const controller = new ProdutoController();

		router.post('/produto/salvar', controller.create);
		router.put('/produto/atualizar/:id', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.update);
		router.delete('/produto/excluir/:id', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.delete);
		router.get('/produto/:id', [param('id', 'Id é obrigatório').notEmpty().isNumeric()], controller.find);
		router.get('/produto', controller.findAll);
	}
}
