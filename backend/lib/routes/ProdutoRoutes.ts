import {Router} from "express";
import {ProdutoController} from "../controllers/ProdutoController";

export class ProdutoRoutes {

    public static createRoutes(router: Router): void {
        const controller = new ProdutoController();
        router.post('/produto/salvar', controller.create);
        router.put('/produto/atualizar', controller.update);
        router.delete('/produto/excluir', controller.delete);
        router.get('/produto/:nome', controller.find);
        router.get('/produto', controller.findAll);
    }
}
