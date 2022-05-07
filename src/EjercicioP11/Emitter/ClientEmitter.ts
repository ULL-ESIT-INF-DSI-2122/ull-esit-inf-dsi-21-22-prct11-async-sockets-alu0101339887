import {EventEmitter} from 'events';

/**
 * Clase Client. Permite conectar un cliente a un servidor.
 */
export class ClientEmitter extends EventEmitter {
  constructor(event: EventEmitter) {
    super();

    let msj = '';
    event.on('data', (data) => {
      msj += data.toString();
    });

    event.on('end', () => {
      this.emit('response', msj);
      console.log(msj);
    });

    event.on('close', () => {
      console.log('Conexión cerrada');
    });

    event.on('error', (err) => {
      console.log(err);
    });
  }
}
