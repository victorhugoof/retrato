import {Router} from "express";
import {ItemVendaController} from "../controllers/ItemVendaController";

export class ItemVendaRoutes {

    public static createRoutes(router: Router): void {
        const controller = new ItemVendaController();
        const path = '/venda/itens';
        router.post(`${path}/salvar`, controller.create);
        router.delete(`${path}/excluir/:id`, controller.delete);
        router.get(`/venda/:venda_id/itens`, controller.findAll);
    }
}
