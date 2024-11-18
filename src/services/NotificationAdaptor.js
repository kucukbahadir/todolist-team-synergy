class Adaptor {

    socketUrl;
    _newSocket = null;
    connection = null;
    handlersMap;

    constructor(socketUrl) {
        this.socketUrl = socketUrl;
        this.handlersMap = new Map();

        this.socketUrl = this.socketUrl.replace('http://', 'ws://');
        this._newSocket = new WebSocket(this.socketUrl);

        const theAdaptor = this;

        theAdaptor._newSocket.onopen = function () {
            console.log(`Connected to notification server ${theAdaptor.socketUrl}`);
            theAdaptor.isConnected = true;
        };

        theAdaptor._newSocket.onerror = function () {
            console.log(`Error connecting to notification server ${theAdaptor.socketUrl}`);
        };

        theAdaptor._newSocket.onmessage = function (e) {
            console.log(`Message received from server: ${e.data}`);
            const msg = e.data.split(' ');
            if (msg[0] === "notify") {
                console.log(`Received notification for target ${msg[1]}`);
                theAdaptor.distributeNotification(msg[1]);
            }
        };

        theAdaptor._newSocket.onclose = function () {
            console.log(`Connection to notification server ${theAdaptor.socketUrl} closed`);
            theAdaptor.isConnected = false;
            theAdaptor._newSocket = null;
        }

        console.log(`Created notification adaptor for ${this.socketUrl}...`)
    }

    distributeNotification(topic) {
        let handlers = this.handlersMap.get(topic);
        if (handlers != null){
            for (let handler of handlers) {
                try {
                    handler(topic);
                } catch (error) {
                    console.error(`Error executing handler for topic ${topic}`, error);
                }
            }
        } else {
            console.log(`Warning obsolete notification for ${topic}`);
        }
    }

    subscribe(topic, handler) {
        if (typeof handler !== 'function') {
            console.error(`Cannot subscribe, handler is not a function:`, handler);
            return;
        }

        let handlers = this.handlersMap.get(topic);
        if (handlers == null) {
            handlers = [];
            this.handlersMap.set(topic, handlers);
        }
        handlers.push(handler);// Hier voegen we de handler toe
        console.log(`Subscribed to topic: ${topic}`);

        // Stuur 'subscribe' bericht naar de server
        if (this.isConnected) {
            this._newSocket.send(`subscribe ${topic}`);
            console.log(`Sent subscribe message for topic: ${topic}`);
        } else {
            console.warn(`Not connected, cannot subscribe to topic: ${topic}`);
        }
    }


    unsubscribe(topic, handler) {
        let handlers = this.handlersMap.get(topic);
        if (handlers) {
            handlers = handlers.filter(h => h !== handler);
            this.handlersMap.set(topic, handlers);
            console.log(`Unsubscribed from topic: ${topic}`);
        }

        // Stuur 'unsubscribe' bericht naar de server
        if (this.isConnected) {
            this._newSocket.send(`unsubscribe ${topic}`);
            console.log(`Sent unsubscribe message for topic: ${topic}`);
        } else {
            console.warn(`Not connected, cannot unsubscribe from topic: ${topic}`);
        }
    }

    notify(topic) {
        this.distributeNotification(topic);
        if (this.isConnected) {
            this._newSocket.send(`notify ${topic}`);
            console.log(`Sent notify message for topic: ${topic}`);
        } else {
            console.warn(`Not connected, cannot send notify message for topic: ${topic}`);
        }
    }

    disconnect() {
        if (this._newSocket != null) {
            this._newSocket.close();
        }
        this.isConnected = false;
        console.log(`Disconnected from notification server ${this.socketUrl}`);
    }
}

export const NotificationAdaptor = new Adaptor(process.env.REACT_APP_API_URL + "/notification");
