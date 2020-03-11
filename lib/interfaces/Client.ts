export interface Client {
	id: String,
	clientId: String,
	clientSecret: String,
	grants: String[],
	redirectUris: String[]
}
