import { ChatServer } from './chat-server';
import { Routes } from './Routes/routes';

let app = new ChatServer().getApp();
const route = new Routes(app);
route.getRoutes();

export { app };