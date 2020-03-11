import {Router} from "express";
import {ProdutoController} from "../controllers/ProdutoController";

export class ProdutoRoutes {

	public static createRoutes(router: Router): void {
		const controller = new ProdutoController();

		router.post('/produto/salvar', controller.create);
		router.put('/produto/atualizar/:id', controller.update);
		router.delete('/produto/excluir/:id', controller.delete);
		router.get('/produto/:id', controller.find);
		router.get('/produto', controller.findAll);
	}
}
