interface BusinessException extends Error {
}

interface BusinessExceptionConstructor {
	readonly prototype: BusinessException;

	new(message?: string): BusinessException;

	(message?: string): BusinessException;
}

declare var BusinessException: BusinessExceptionConstructor;
