import {EventEmitter} from 'events';

/**
 * Clase Client. Permite conectar un cliente a un servidor.
 */
export class Client extends EventEmitter {
  constructor(event: EventEmitter) {
    super();

    /**
     * Evento que se dispara cuando se manda un mensaje.
     */
    let msj = '';
    event.on('data', (data) => {
      msj += data.toString();
    });

    /**
     * Evento que se dispara cuando se termina de mandar un mensaje.
     */
    event.on('end', () => {
      this.emit('response', msj);
      console.log(msj);
    });

    /**
     * Evento que se dispara cuando se cierra la conexión.
     */
    event.on('close', () => {
      console.log('Conexión cerrada');
    });

    /**
     * Evento que se dispara cuando se produce un error.
     */
    event.on('error', (err) => {
      console.log(err);
    });
  }
}
