export class Message {
    constructor(private message: string) {
        this.message = (this.message?.trim() || '');
    }
}
