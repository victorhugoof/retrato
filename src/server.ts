import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import * as i18n from 'i18n';

const routes = require("./routes/Routes");

class App {

	private app: express.Application = express();
	private mongoUrl: string = 'mongodb+srv://pod1:pod1@cluster-uhxmx.gcp.mongodb.net/retrato-da-moda?retryWrites=true&w=majority';
	private port = 8080;

	constructor() {
		App.configI18n();
		this.config();
		this.mongoSetup();
	}

	private static configI18n(): void {
		i18n.configure({
			locales: ['pt'],
			directory: __dirname + '/locales',
			defaultLocale: 'pt'
		});
	}

	public start() {
		this.app.listen(this.port, () => console.log('Servidor iniciado na porta ' + this.port));
	}

	private config(): void {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(routes);
		this.app.use(i18n.init);
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

new App().start();
