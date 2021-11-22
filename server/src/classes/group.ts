import Socket from './socket';

export default class Group {
  host;
  contender?: Socket;
  constructor(host: Socket) {
    this.host = host;
  }
}