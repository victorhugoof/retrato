import {Router} from "express";
import {ItemVendaController} from "../controllers/ItemVendaController";

export class ItemVendaRoutes {

    public static createRoutes(router: Router, path: String): void {
        const controller = new ItemVendaController();
        router.post(`${path}/salvar`, controller.create);
        router.delete(`${path}/excluir/:id`, controller.delete);
        router.get(`${path}/:venda_id`, controller.findAll);
    }
}
