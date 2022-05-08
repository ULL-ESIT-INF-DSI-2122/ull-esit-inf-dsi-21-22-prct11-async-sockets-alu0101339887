import * as net from 'net';
import {spawn} from 'child_process';

/**
 * Clase que representa un servidor.
 * @class Servidor
 */
export class Servidor {
  /**
   * Constructor de la clase Servidor.
   * @param port Puerto en el que escucha el servidor.
   * @constructor
   */
  constructor(private port: number) {}

  /**
   * Método que inicia el servidor y permanece a la escucha de conexiones.
   */
  start() {
    const server = net.createServer({allowHalfOpen: true}, (socket) => {
      console.log('Un cliente se ha conectado');
      let mensaje = '';
      socket.on('data', (dataJSON) => {
        mensaje += dataJSON.toString();
      });
      socket.on('end', () => {
        const json = JSON.parse(mensaje);
        if (json.type === 'command') {
          console.log('\tComando: ' + json.command + ' ' + json.args.join(' '));
          const child = spawn(json.command, [...json.args]);
          let output = '';
          child.stdout.on('data', (data) => {
            output += data;
          });
          child.on('close', () => {
            // eslint-disable-next-line max-len
            console.log('\tEl proceso ha finalizado con el código: ' + child.exitCode);
            socket.write(JSON.stringify({type: 'print', data: output}));
            console.log('El cliente se ha desconectado');
            socket.end();
          });
        }
      });
      socket.on('error', (err) => {
        console.log(err);
      });
    });
    server.listen(this.port, () => {
      console.log('Esperando conexiones al puerto: [' + this.port + ']');
    });
  }
}

const server = new Servidor(3000);
server.start();