import {Usuario} from "./Usuario";
import {Client} from "./Client";

export interface Token {
	accessToken?: String,
	accessTokenExpiresAt?: Date,
	refreshToken?: String,
	refreshTokenExpiresAt?: Date,
	client?: Client,
	user?: Usuario
}
