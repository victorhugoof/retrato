import * as i18 from 'i18n';

export enum Messages {
	PARAMETROS_INVALIDOS,
	REGISTRO_EXCLUIDO_COM_SUCESSO,
	REGISTRO_NAO_ENCONTRADO,
	ERRO_INESPERADO,
	PRODUTO_POSSUI_VENDA
}

export function getMessage(message: Messages, ...props: string[]): string {
	return i18.__mf(Messages[message], props);
}
