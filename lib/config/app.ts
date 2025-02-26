import * as express from "express";
import {Application, Request, Response} from "express";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import * as i18n from 'i18n';
import * as bodyParser from 'body-parser';
import {Routes} from "../routes/Routes";
import {Message} from "../interfaces/Message";
import {Token} from "oauth2-server";
import {getMessage, Messages} from "../helper/i18n";

export class App {

	private static OAuth2Server = require('oauth2-server');
	private static Request = App.OAuth2Server.Request;
	private static Response = App.OAuth2Server.Response;
	private static server: Application = express();

	private static mongoUrl: string = 'mongodb+srv://pod1:pod1@cluster-uhxmx.gcp.mongodb.net/retrato?retryWrites=true&w=majority';
	private static port = 8080;

	private static get oauth() {
		return App.server['oauth'];
	}

	private static set oauth(value: any) {
		App.server['oauth'] = value;
	}

	static start() {
		App.configure();
		App.server.listen(App.port, () => console.log('Servidor iniciado na porta ' + App.port));
	}

	private static configure() {
		App.configI18n();
		App.configServer();
		App.mongoSetup();
	}

	private static configI18n(): void {
		i18n.configure({
			locales: ['pt'],
			directory: __dirname + '/../locales',
			defaultLocale: 'pt'
		});
	}

	private static configServer(): void {
		App.server.use(cors());
		App.server.use(bodyParser.urlencoded({extended: true}));
		App.server.use(bodyParser.json());
		App.server.use(i18n.init);
		App.configOauth();
		App.server.use(new Routes().router);
		App.server.use(App.logErrors);
		App.server.use(App.clientErrorHandler);
		App.server.use(App.errorHandler);
	}

	private static configOauth() {

		App.oauth = new App.OAuth2Server({
			model: require('./oauth'),
			accessTokenLifetime: 60 * 60,
			allowBearerTokensInQueryString: true
		});

		App.server.all('/oauth/token', App.obtainToken);
		App.server.all('*', App.authenticateRequest);
		App.server.all('/', (_req: Request, res: Response) => res.json(new Message('API Retrato da Moda -> OK')));
		App.server.get('/oauth/verify', (_req: Request, res: Response) => res.json(true));
	}

	private static mongoSetup(): void {
		mongoose.connect(App.mongoUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}).then(() => {
			console.log('Base de dados carregada');
			require('./oauth').loadDefaultData().then(() => console.log('Client/Usuario padrão carregados'));
		}, e => {
			console.log('Erro ao carregar a base de dados: ' + e);
		});
	}

	private static obtainToken(req: Request, res: Response) {

		const request = new App.Request(req);
		const response = new App.Response(res);

		return App.oauth.token(request, response)
			.then(function (token: Token) {
				res.json(token);
			}).catch(function (err) {
				res.status(err.code || 500).json(err);
			});
	}

	private static authenticateRequest(req: Request, res: Response, next) {

		if ((req.path.startsWith('/oauth') && req.path !== '/oauth/verify') || req.path === '/') {
			return next();
		}

		const request = new App.Request(req);
		const response = new App.Response(res);

		return App.oauth.authenticate(request, response)
			.then(function (_token) {
				next();
			}).catch(function (err) {
				res.status(err.code || 500).json(err);
			});
	}

	private static logErrors(err, _req, _res, next) {
		console.error(err.stack);
		next(err);
	}

	private static clientErrorHandler(err, req, res, next) {
		if (req.xhr) {
			res.status(500).send({error: getMessage(Messages.ERRO_INESPERADO)});
		} else {
			next(err);
		}
	}

	private static errorHandler(err, _req, res, _next) {
		res.status(500);
		res.render('error', {error: err});
	}
}
