import WebSocket from 'ws';

export default interface Socket extends WebSocket {
  test: string;
}