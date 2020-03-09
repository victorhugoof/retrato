import {model, Schema} from "mongoose";

const VendaSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    data_cadastro: {
        type: Date,
        default: Date.now
    }
});
export default model('Venda', VendaSchema);
