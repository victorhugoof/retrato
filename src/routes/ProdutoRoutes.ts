import {Router} from "express";
import {ProdutoController} from "../controllers/ProdutoController";

export class ProdutoRoutes {

    public static createRoutes(router: Router): void {
        const controller = new ProdutoController();
        const path = '/produto';
        router.post(`${path}/salvar`, controller.create);
        router.put(`${path}/atualizar/:id`, controller.update);
        router.delete(`${path}/excluir/:id`, controller.delete);
        router.get(`${path}/:id`, controller.find);
        router.get(`${path}`, controller.findAll);
    }
}
