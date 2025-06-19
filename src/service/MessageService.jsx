class MessageService {
    constructor() {
        this.messageHandler = null;
    }

    setMessage(handler) {
        this.messageHandler = handler;
    }

    showMessage(message, severity) {
        if (this.messageHandler) {
            this.messageHandler(message, severity);
        } else {
            console.error("Message handler not registered.");
        }
    }
}

export const messageService = new MessageService();