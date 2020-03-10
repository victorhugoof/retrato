import {ItemVendaService} from "./ItemVendaService";
import {ProdutoService} from "./ProdutoService";
import {VendaService} from "./VendaService";

export class ServiceFactory {

	private static factory: ServiceFactory;
	private services: Map<string, Object>;

	public static getProdutoService(): ProdutoService {
		return ServiceFactory.getService(ProdutoService, () => new ProdutoService())
	}

	public static getVendaService(): VendaService {
		return ServiceFactory.getService(VendaService, () => new VendaService());
	}

	public static getItemVendaService(): ItemVendaService {
		return ServiceFactory.getService(ItemVendaService, () => new ItemVendaService());
	}

	private static getInstance() {
		if (!ServiceFactory.factory) {
			ServiceFactory.factory = new ServiceFactory();
			ServiceFactory.factory.services = new Map<string, Object>();
		}
		return ServiceFactory.factory;
	}

	private static getService<T>(serviceName: any, valueFn: () => T): T {
		const service = ServiceFactory.getInstance();
		if (!service.services.get(serviceName)) {
			service.services.set(serviceName, valueFn())
		}
		return <T>service.services.get(serviceName);
	}
}
