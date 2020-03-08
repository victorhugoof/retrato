import {Model} from "mongoose";

export default async function getNextId(model: Model<any>) {
    const ultimo = await model.findOne().sort({id: -1});
    let id = 0;
    if (ultimo) {
        id = ultimo['id'];
    }
    return id + 1;
}
