export interface Token {
	accessToken?: String;
	accessTokenExpiresAt?: Date;
	refreshToken?: String;
	refreshTokenExpiresAt?: Date;
	client?: any;
	user?: any;
}
