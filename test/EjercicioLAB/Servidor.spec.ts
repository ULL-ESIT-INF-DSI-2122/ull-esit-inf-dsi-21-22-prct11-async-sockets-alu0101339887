import 'mocha';
import {expect} from 'chai';

import {spawn} from 'child_process';
import * as sinon from 'sinon';
import {exit} from 'process';

import {Cliente} from '../../src/EjercicioLAB/Cliente';
import {Servidor} from '../../src/EjercicioLAB/Servidor';

describe('Servidor', () => {
  let cliente: Cliente;
  let servidor: Servidor;
  let child: any;

  before(() => {
    child = spawn('node', ['../../src/EjercicioLAB/Servidor.js']);
    sinon.stub(console, 'log');
    servidor = new Servidor(60300);
    cliente = new Cliente(60300);
  });

  after(() => {
    exit(0);
  });

  it('Debería poder empezar el proceso', () => {
    expect(servidor).to.be.an.instanceof(Servidor);
    expect(servidor.start).to.be.a('function');
    expect(servidor).respondTo('start');
  });

  it('Debería poder mandar un comando', (done) => {
    let output = '';
    child.stdout.on('data', (data: any) => {
      output += data;
    });
    child.on('close', () => {
      expect(output).to.not.be.null;
      done();
    });
    cliente.sendCommand('ls', ['-l']);
  });
});