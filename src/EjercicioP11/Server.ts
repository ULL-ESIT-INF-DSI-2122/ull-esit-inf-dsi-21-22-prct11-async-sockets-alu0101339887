// import {spawn} from 'child_process';
import * as fs from 'fs';
import * as net from 'net';

const server = net.createServer((connection) => {
  console.log('Un cliente se ha conectado');
  connection.write('Conexión establecida');
  connection.on('data', (data) => {
    fs.access(data.toString(), fs.constants.F_OK, (err) => {
      if (err) {
        console.log('La ruta introducida no existe');
        connection.on('error', (err) => {
          console.log(err);
        });
      } else {
        // const file = spawn('cat', [data.toString()]);
        // file.stdout.on('data', (data) => {
        //   connection.write(data);
        // });
        // file.stderr.on('data', (data) => {
        //   console.log(data);
        // });
      }
    });
  });
  connection.on('end', () => {
    console.log('Envío de datos finalizado');
  });
  connection.on('close', () => {
    console.log('Un cliente se ha desconectado');
  });
});
server.listen(60300, () => {
  console.log('Esperando conexiones');
});