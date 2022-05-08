import * as net from 'net';
import {NoteManage} from './AppCode/NoteManage';

/**
 * Clase Server que se encarga de crear un servidor y escuchar las conexiones
 * de los clientes.
 */
export class Server {
  private server;
  /**
   * Constructor de la clase Server en la que se inicializa el servidor.
   * @param port Numero de puerto
   */
  constructor(private port: number) {
    this.server = net.createServer((socket) => {
      console.log('\nCliente conectado');
      let msj: string = '';
      /**
       * Evento que se encarga de recibir los mensajes del cliente.
       */
      socket.on('data', (data) => {
        msj += data;
        const cmd = JSON.parse(msj);
        const manage = new NoteManage();
        console.log('  El cliente envió: ' + cmd._[0].toString());
        /**
         * Según el comando que se envíe, se ejecuta una función unica.
         */
        // Agregar una nota
        if (cmd._[0] === 'add') {
          manage.addNote(cmd.user, cmd.title, cmd.body, cmd.color);
        // Editar una nota
        } else if (cmd._[0] === 'edit') {
          manage.editNote(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
        // Eliminar una nota
        } else if (cmd._[0] === 'delete') {
          manage.deleteNote(cmd.args[0], cmd.args[1]);
        // Listar todas las notas
        } else if (cmd._[0] === 'list') {
          manage.listNotes(cmd.args[0]);
        // Leer una nota
        } else if (cmd._[0] === 'read') {
          manage.readNote(cmd.args[0], cmd.args[1]);
        } else {
          console.log('Comando no reconocido');
          socket.write('Comando no reconocido');
        }
        console.log('Respuesta enviada');
        socket.end();
      });
      /**
       * Evento que se encarga de cerrar la conexion del cliente.
       */
      socket.on('close', () => {
        console.log('Conexión cerrada');
      });
      /**
       * Evento que se encarga de analizar los errores.
       */
      socket.on('error', (err) => {
        console.log(err);
      });
    });
  }

  /**
   * Función que se encarga de iniciar el servidor.
   */
  public listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor iniciado');
    });
  }
}

/**
 * Instancia de la clase Server.
 */
const srv = new Server(3000);
srv.listen();