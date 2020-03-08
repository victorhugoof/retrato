import {Request, Response} from 'express';
import Produto from "../models/Produto";
import {Message} from "../interfaces/Message";
import getNextId from "../utils/NextId";

export class ProdutoController {

    public async create(request: Request, response: Response) {
        const {codigo, nome, valor} = request.body;
        const id = await getNextId(Produto);

        await Produto.create({
            id,
            codigo,
            nome,
            valor
        }, (err, res) => {
            if (err) {
                return response.send(err);
            }
            return response.send(res);
        });
    }

    public async update(request: Request, response: Response) {
        let {id} = request.params;
        const {codigo, nome, valor} = request.body;

        const produto = await Produto.findOne({id});
        if (!produto) {
            return response.send(new Message('Produto não encontrado!'));
        }

        await Produto.update({id}, {
            codigo,
            nome,
            valor
        }, (err, res) => {
            if (err) {
                return response.send(err);
            }
            return response.send(res);
        });
    }

    public async delete(request: Request, response: Response) {
        const {id} = request.params;

        const produto = await Produto.findOne({id});
        if (!produto) {
            return response.send(new Message('Produto não encontrado!'));
        }

        await Produto.deleteOne({id}, (err) => {
            if (err) {
                return response.send(err);
            }
            return response.send(new Message('Produto excluído com sucesso!'));
        });
    }

    public async find(request: Request, response: Response) {
        const {id} = request.params;

        const produto = await Produto.findOne({id});
        if (!produto) {
            return response.send(new Message('Produto não encontrado!'));
        }
        return response.send(produto);
    }

    public async findAll(request: Request, response: Response) {
        return response.send(await Produto.find());
    }

}
