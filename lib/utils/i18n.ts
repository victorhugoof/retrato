import * as i18 from 'i18n';

export enum Messages {
	ITEM_EXCLUIDO_COM_SUCESSO,
	PRODUTO_EXCLUIDO_COM_SUCESSO,
	VENDA_EXCLUIDA_COM_SUCESSO
}

export class i18n {
	public static getMessage(message: Messages): string {
		return i18.__(Messages[message]);
	}
}
