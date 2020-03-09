import {Produto} from "../interfaces/Produto";
import {ProdutoModel} from "../models/Produto";

export class ProdutoService {

    public async find(id): Promise<Produto> {
        return ProdutoModel.findOne({id});
    }
}