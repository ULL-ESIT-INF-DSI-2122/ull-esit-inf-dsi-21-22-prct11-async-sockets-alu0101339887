import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

sinon.stub(console, 'log');

import {NoteManage} from '../../src/EjercicioP11/AppCode/NoteManage';

describe('Tests de la clase NoteManage', () => {
  let noteManage: NoteManage;
  let U: string;
  let T: string;
  let B: string;
  let CA: string;
  beforeEach(() => {
    noteManage = new NoteManage();
    U = 'Roxana';
    T = 'Primera_Nota';
    B = 'Hola Mundo';
    CA = 'amarillo';
  });
  it('Debería añadir una nueva nota', () => {
    expect(noteManage.addNote).to.exist;
    expect(noteManage.addNote).to.be.a('function');
    expect(noteManage.addNote(U, T, B, CA)).not.to.throw;
  });
  it('Debería editar la nota', () => {
    B = 'Hola Mundo 2';
    CA = 'rojo';
    expect(noteManage.editNote).to.exist;
    expect(noteManage.editNote).to.be.a('function');
    expect(noteManage.editNote(U, T, B, CA)).not.to.throw;
    expect(noteManage.editNote(U, 'Nota_1', B, CA)).not.to.throw;
  });
  it('Debería devolver las notas', () => {
    expect(noteManage.listNotes).to.exist;
    expect(noteManage.listNotes).to.be.a('function');
    expect(noteManage.listNotes(U)).not.to.throw;
    expect(noteManage.listNotes('Usuario')).not.to.throw;
  });
  it('Debería leer una nota', () => {
    expect(noteManage.readNote).to.exist;
    expect(noteManage.readNote).to.be.a('function');
    expect(noteManage.readNote(U, T)).not.to.throw;
    CA = 'azul';
    noteManage.addNote(U, T, B, CA);
    expect(noteManage.readNote(U, T)).not.to.throw;
    expect(noteManage.readNote(U, 'Nota_1')).not.to.throw;
  });
  it('Debería borrar la nota', () => {
    expect(noteManage.deleteNote).to.exist;
    expect(noteManage.deleteNote).to.be.a('function');
    expect(noteManage.deleteNote(U, T)).not.to.throw;
    expect(noteManage.deleteNote(U, 'Nota_1')).not.to.throw;
  });
  it('Existe un método para crear la ruta del directorio del usuario', () => {
    expect(noteManage.getCreatePath).to.exist;
    expect(noteManage.getCreatePath).to.be.a('function');
    expect(noteManage.getCreatePath(U)).not.to.throw;
  });
  it('Existe un método para crear el directorio del usuario', () => {
    expect(noteManage.getAddDir).to.exist;
    expect(noteManage.getAddDir).to.be.a('function');
    expect(noteManage.getAddDir()).not.to.throw;
  });
  it('Existe un método para buscar una nota', () => {
    expect(noteManage.getSearchNote).to.exist;
    expect(noteManage.getSearchNote).to.be.a('function');
    expect(noteManage.getSearchNote(T)).not.to.throw;
  });
  it('Existe un método para leer una nota', () => {
    expect(noteManage.getPrint).to.exist;
    expect(noteManage.getPrint).to.be.a('function');
    expect(noteManage.getPrint(T, B, CA)).not.to.throw;
  });
});