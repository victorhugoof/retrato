import {Router} from "express";
import {ProdutoController} from "../controllers/ProdutoController";

export class ProdutoRoutes {

    public static createRoutes(router: Router, path: String): void {
        const controller = new ProdutoController();
        router.post(`${path}/salvar`, controller.create);
        router.put(`${path}/atualizar/:id`, controller.update);
        router.delete(`${path}/excluir/:id`, controller.delete);
        router.get(`${path}/:id`, controller.find);
        router.get(`${path}`, controller.findAll);
    }
}
