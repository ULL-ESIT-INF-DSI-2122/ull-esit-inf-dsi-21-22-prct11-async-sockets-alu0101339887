import * as net from 'net';

const client = net.connect({port: 60300});

console.log('Enviando ruta');
const filePath = 'Notes/prueba.txt';
client.write(filePath);

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  const finalMesage = JSON.parse(wholeData);
  console.log(finalMesage.Content);
});

client.on('error', (err) => {
  console.log(err);
});