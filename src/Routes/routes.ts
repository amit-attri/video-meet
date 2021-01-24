import * as express from 'express';
import * as path from 'path';
const { v4: uuidV4 } = require('uuid')

export class Routes {
  
  private app: express.Application;
  
  constructor(app: express.Application) {
    this.app = app;
    this.setStaticDir();
  }
  
  private home(): void {
    this.app.get('/', (req, res) => {
      res.redirect(`/${uuidV4()}`)
    })
  }
  
  private room(): void {
    this.app.get('/:room', (req, res) => {
      res.render('room', { roomId: req.params.room })
    })
  }
  
  private setStaticDir(): void {
    this.app.use(express.static(path.join(__dirname, '../views')));
  }
  
  public getRoutes(): void {
    this.home();
    this.room();
  }
  
}