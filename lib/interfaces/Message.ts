export class Message {
	constructor(private message: String) {
		this.message = (this.message?.trim() || '');
	}
}
