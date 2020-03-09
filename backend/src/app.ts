import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import * as fs from "fs";
import * as https from "https";

const routes = require("./routes/Routes");

class App {

    private app: express.Application = express();
    private mongoUrl: string = 'mongodb+srv://pod1:pod1@cluster-uhxmx.gcp.mongodb.net/retrato-da-moda?retryWrites=true&w=majority';
    private port = 8080;

    constructor() {
        this.config();
        this.mongoSetup();
    }

    public start() {
        this.app.listen(this.port, () => console.log('Servidor iniciado na porta ' + this.port));
    }

    public startHttps() {
        const httpsOptions = {
            key: fs.readFileSync('./config/key.pem'),
            cert: fs.readFileSync('./config/cert.pem')
        };
        https.createServer(httpsOptions, this.app)
            .listen(this.port, () => console.log('Servidor seguro iniciado na porta ' + this.port));
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(routes);
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => {
            console.log('Base de dados carregada');
        }, e => {
            console.log('Erro ao carregar a base de dados: ' + e);
        });
    }

}

export default new App();
