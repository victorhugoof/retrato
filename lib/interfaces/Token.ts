export interface Token {
	accessToken?: String;
	accessTokenExpiresAt?: Date;
	refreshToken?: String;
	refreshTokenExpiresAt?: Date;
	client_id?: String;
	usuario_id?: number;
}
