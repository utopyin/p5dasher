import WebSocket, { WebSocketServer } from 'ws';
import { setWsHeartbeat } from "ws-heartbeat/server";
import Socket from './classes/socket'

const wss = new WebSocketServer({
  port: 8080
});

setWsHeartbeat(wss, (ws, message) => {
  if (message.toString() === 'ping') {
    ws.send('pong');
  }
}, 60000);

wss.on('connection', function connection(ws: Socket) {
  console.log(`[+] ${wss.clients.size} connections.`)

  ws.test = 'd'

  wss.clients.forEach((ws) => {
    const socket = ws as Socket;
  })
  ws.on('message', (message) => {
    if (message.toString() === 'ping') return
    switch(JSON.parse(message.toString()).direction) {
      case 'left':
        ws.send(JSON.stringify({direction: 'left'}));
        break;
      case 'right':
        ws.send(JSON.stringify({direction: 'right'}));
        break;
    }
  })

  ws.on('close', () => {
    console.log(`[-] ${wss.clients.size} connections`)
  })
});


wss.on('close', function close() {
  console.log('closing...');
});