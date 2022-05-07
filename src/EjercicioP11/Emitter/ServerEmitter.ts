import * as net from 'net';
import {NoteManage} from '../AppCode/NoteManage';

export class ServerEmitter {
  private server;
  constructor(private port: number) {
    this.server = net.createServer((socket) => {
      let msj: string = '';
      console.log('\nCliente conectado');
      socket.on('data', (data) => {
        msj += data;
        const cmd = JSON.parse(msj);
        const manage = new NoteManage();
        console.log('  El cliente envió: ' + cmd._[0].toString());
        if (cmd._[0] === 'add') {
          manage.addNote(cmd.user, cmd.title, cmd.body, cmd.color);
        } else if (cmd._[0] === 'edit') {
          manage.editNote(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
        } else if (cmd._[0] === 'delete') {
          manage.deleteNote(cmd.args[0], cmd.args[1]);
        } else if (cmd._[0] === 'list') {
          manage.listNotes(cmd.args[0]);
        } else if (cmd._[0] === 'read') {
          manage.readNote(cmd.args[0], cmd.args[1]);
        } else {
          console.log('Comando no reconocido');
          socket.write('Comando no reconocido');
        }
        console.log('Respuesta enviada');
        socket.end();
      });
      socket.on('close', () => {
        console.log('Conexión cerrada');
      });
      socket.on('error', (err) => {
        console.log(err);
      });
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor iniciado');
    });
  }
}