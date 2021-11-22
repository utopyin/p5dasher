"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const server_1 = require("ws-heartbeat/server");
const wss = new ws_1.WebSocketServer({
    port: 8080
});
(0, server_1.setWsHeartbeat)(wss, (ws, message) => {
    if (message.toString() === 'ping') {
        ws.send('pong');
    }
}, 60000);
wss.on('connection', function connection(ws) {
    console.log(`[+] ${wss.clients.size} connections.`);
    ws.test = 'd';
    wss.clients.forEach((ws) => {
        const socket = ws;
    });
    ws.on('message', (message) => {
        if (message.toString() === 'ping')
            return;
        switch (JSON.parse(message.toString()).direction) {
            case 'left':
                ws.send(JSON.stringify({ direction: 'left' }));
                break;
            case 'right':
                ws.send(JSON.stringify({ direction: 'right' }));
                break;
        }
    });
    ws.on('close', () => {
        console.log(`[-] ${wss.clients.size} connections`);
    });
});
wss.on('close', function close() {
    console.log('closing...');
});
//# sourceMappingURL=server.js.map