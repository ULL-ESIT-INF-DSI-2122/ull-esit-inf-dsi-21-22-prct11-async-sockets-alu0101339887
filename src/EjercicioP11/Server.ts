import {ServerEmitter} from './Emitter/ServerEmitter';

const srv = new ServerEmitter(3000);
srv.listen();
