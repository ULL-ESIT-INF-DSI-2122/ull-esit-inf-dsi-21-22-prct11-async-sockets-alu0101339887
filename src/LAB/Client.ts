import {Cliente} from './Cliente';

const client = new Cliente(3000);

// eslint-disable-next-line max-len
if (process.argv[2] === 'cat' && process.argv[3] !== undefined) {
  client.sendCommand('cat', [process.argv[3]]);
} else if (process.argv[2] === 'ls' && process.argv[3] !== undefined) {
  client.sendCommand('ls', [process.argv[3]]);
} else if (process.argv[2] === 'pwd') {
  client.sendCommand('pwd', []);
} else if (process.argv[2] === 'date') {
  client.sendCommand('date', []);
} else if (process.argv[2] === 'whoami') {
  client.sendCommand('whoami', []);
} else if (process.argv[2] === 'touch' && process.argv[3] !== undefined) {
  client.sendCommand('touch', [process.argv[3]]);
} else if (process.argv[2] === 'rm' && process.argv[3] !== undefined) {
  client.sendCommand('rm', [process.argv[3]]);
} else if (process.argv[2] === 'mkdir' && process.argv[3] !== undefined) {
  client.sendCommand('mkdir', [process.argv[3]]);
} else if (process.argv[2] === 'rmdir' && process.argv[3] !== undefined) {
  client.sendCommand('rmdir', [process.argv[3]]);
} else {
  console.log('Usage: node client.js <command> <args>');
  // eslint-disable-next-line max-len
  console.log('-> Commands: cat, ls, pwd, date, whoami, touch, rm, mkdir, rmdir');
  process.exit(1);
}
