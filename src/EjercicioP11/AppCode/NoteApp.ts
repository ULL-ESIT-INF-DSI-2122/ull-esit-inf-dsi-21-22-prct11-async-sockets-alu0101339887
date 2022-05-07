import {ClientEmitter} from '../Emitter/ClientEmitter';
import yargs from 'yargs';
import * as net from 'net';

if (process.argv.length > 2) {
  const conection = net.connect(3000);
  const client = new ClientEmitter(conection);
  client.on('response', (data) => {
    console.log('Mensaje recibido: ' + data);
  });

  /**
   * Comando add. Añade una nota al directorio del usuario.
   */
  yargs.command({
    command: 'add',
    describe: 'Añade una nueva nota',
    builder: {
      user: {
        describe: 'Autor de la nota',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Cuerpo de la nota',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Color de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      if (typeof argv.user === 'string' &&
          typeof argv.title === 'string' &&
          typeof argv.body === 'string' &&
          typeof argv.color === 'string') {
        console.log('Añadiendo nota...');
        conection.write(`${JSON.stringify(argv)}`, (err) => {
          if (err) {
            console.log('Error al enviar el comando');
            console.log(err);
          }
        });
      }
    },
  });

  /**
   * Comando edit. Edita una nota del directorio del usuario
   */
  yargs.command({
    command: 'edit',
    describe: 'Edita una nota',
    builder: {
      user: {
        describe: 'Autor de la nota',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Cuerpo de la nota',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Color de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      if (typeof argv.title === 'string' &&
          typeof argv.body === 'string' &&
          typeof argv.user === 'string' &&
          typeof argv.color === 'string') {
        console.log('Editando nota...');
        const cmd = 'edit';
        conection.write(`${JSON.stringify(cmd)}`, (err) => {
          if (err) {
            console.log('Error al enviar el comando');
            console.log(err);
          }
        });
      }
    },
  });

  /**
   * Comando delete. Elimina una nota del directorio del usuario
   */
  yargs.command({
    command: 'delete',
    describe: 'Elimina una nota',
    builder: {
      user: {
        describe: 'Autor de la nota',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      if (typeof argv.title === 'string' && typeof argv.user === 'string') {
        console.log('Eliminando nota...');
        const cmd = 'delete';
        conection.write(`${JSON.stringify(cmd)}`, (err) => {
          if (err) {
            console.log('Error al enviar el comando');
            console.log(err);
          }
        });
      }
    },
  });

  /**
   * Comando list. Lista las notas del directorio del usuario
   */
  yargs.command({
    command: 'list',
    describe: 'Lista las notas del directorio del usuario',
    builder: {
      user: {
        describe: 'Autor de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      if (typeof argv.user === 'string') {
        console.log('Listando notas...');
        const cmd = 'list';
        conection.write(`${JSON.stringify(cmd)}`, (err) => {
          if (err) {
            console.log('Error al enviar el comando');
            console.log(err);
          }
        });
      }
    },
  });

  /**
   * Comando read. Lee una nota del directorio del usuario
   */
  yargs.command({
    command: 'read',
    describe: 'Lee una nota',
    builder: {
      user: {
        describe: 'Autor de la nota',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Título de la nota',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      if (typeof argv.title === 'string' &&
          typeof argv.user === 'string') {
        console.log('Leyendo nota...');
        const cmd = 'read';
        conection.write(`${JSON.stringify(cmd)}`, (err) => {
          if (err) {
            console.log('Error al enviar el comando');
            console.log(err);
          }
        });
      }
    },
  });

  yargs.parse();
}
