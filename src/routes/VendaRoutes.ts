import {Router} from "express";
import {VendaController} from "../controllers/VendaController";

export class VendaRoutes {

    public static createRoutes(router: Router): void {
        const controller = new VendaController();
        const path = '/venda';
        router.post(`${path}/salvar`, controller.create);
        router.delete(`${path}/excluir/:id`, controller.delete);
        router.get(`${path}/:id`, controller.find);
        router.get(`${path}`, controller.findAll);
    }
}
