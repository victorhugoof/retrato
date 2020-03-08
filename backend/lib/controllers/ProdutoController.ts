import {Request, Response} from 'express';
import Produto from "../models/Produto";
import {Message} from "../interfaces/Message";

export class ProdutoController {

    public async create(request: Request, response: Response) {
        const {nome, valor} = request.body;

        const produto = await Produto.findOne({nome});
        if (produto) {
            return response.send(produto);
        }

        await Produto.create({
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
        const {nome, valor} = request.body;

        const produto = await Produto.findOne({nome});
        if (!produto) {
            return response.send(new Message('Produto não encontrado!'));
        }

        await Produto.update({nome}, {
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
        const {nome} = request.params;

        const produto = await Produto.findOne({nome});
        if (!produto) {
            return response.send(new Message('Produto não encontrado!'));
        }

        await Produto.deleteOne({nome}, (err) => {
            if (err) {
                return response.send(err);
            }
            return response.send(new Message('Produto excluído com sucesso!'));
        });
    }

    public async find(request: Request, response: Response) {
        const {nome} = request.params;

        const produto = await Produto.findOne({nome});
        if (!produto) {
            return response.send(new Message('Produto não encontrado!'));
        }
        return response.send(produto);
    }

    public async findAll(request: Request, response: Response) {
        return response.send(await Produto.find());
    }

}
