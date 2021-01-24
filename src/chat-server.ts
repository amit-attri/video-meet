import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
const { PeerServer } = require('peer');

export class ChatServer {
  
  public static readonly PORT:number = 3000;
  private app: express.Application;
  private port: string | number;
  private server: Server;
  private io: socketIo.Server;
  
  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
    this.createPeerServer();
  }
  
  private createApp(): void {
    this.app = express();
    this.app.use(express.static('public'));
    this.app.set('view engine', 'ejs')
  }
  
  private createPeerServer(): void {
    const peerServer = PeerServer({ port: 3001, path: '/' });
  }
  
  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }
  
  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
    
    this.io.on('connection', socket => {
      socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    
        socket.on('disconnect', () => {
          socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
      })
    })
  }
  
  private createServer(): void {
    this.server = createServer(this.app);
  }
  
  
  private sockets(): void {
    this.io = socketIo(this.server);
  }
  
  public getApp(): express.Application {
    return this.app;
  }
}