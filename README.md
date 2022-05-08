<br>

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887)


# ÍNDICE

- [INTRODUCCIÓN](#id1).
- [DESARROLLO](#id2).
  - [Fichero NoteManage.ts](#id3).
    - [createPath(...) & getCreatePath(...)](#id4).
    - [addDir() & getAddDir()](#id5).
    - [searchNote(...) & getSearchNote(...)](#id6).
    - [printNote(...) & getPrint(...)](#id7).
    - [addNote(...)](#id8).
    - [editNote(...)](#id9).
    - [deleteNote(...)](#id10).
    - [listNotes(...)](#id11).
    - [readNotes(...)](#id12).
  - [Fichero NoteApp.ts](#id13).
    - [Comando Add](#id14).
    - [Comando Edit](#id15).
    - [Comando Delete](#id16).
    - [Comando List](#id17).
    - [Comando Read](#id18).
  - [Fichero Client](#id19).
  - [Fichero Server](#id20).
- [EJEMPLOS DE EJECUCIÓN](#id21).
  - [Servidor](#id22).
  - [Cliente](#id23).
- [CONCLUSIÓN](#id24).

# INTRODUCCIÓN<a name="id1"></a>

En esta práctica se deberá crear una API que permita al usuario manejar y administrar notas de texto a partir de la que ha se había creado en la anterior práctica (Práctica 9), sin embargo, en esta práctica se hará haciendo uso de peticiones del cliente a un servidor y, este, ejecutará los comandos que el usuario indique.  

Para ello tendremos que crear varios ficheros, que podremos encontrarlos dentro del directorio */EjercicioP11*. Por otra parte, en el directorio */LAB* podremos encontrar resuelto el ejercicio propuesto en la hora de prácticas. A su vez, ambos directorios estarán ubicados dentro del directorio */src*.

Por otro lado, también se creará la documentación, de forma automática, de todos los ejercicios que hayamos realizado haciendo uso de TypeDoc. Podremos consultar la documentación pulsando sobre el siguiente [_enlace_](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/tree/main/docs) que le llevará al fichero o accediendo manualmente al directorio */docs*.

Además, podrá acceder a la página web del informe pulsando sobre este [_enlace_](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/).

# DESARROLLO<a name="id2"></a>

## Fichero NoteManage.ts<a name="id3"></a>

En este primer fichero ([NoteManage.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/blob/main/src/EjercicioP11/AppCode/NoteManage.ts)) se encuentra la lógica de la aplicación. En ella se encuentra la clase NotesManage, que es la que se encargará de gestionar las notas. En ella se encuentran algunas de las funciones que servirán para administrar las notas de cada uno de los usuarios, como por ejemplo para crear, leer, actualizar y borrar notas.

```typescript
export class NoteManage {
  private ruta: string;
  constructor() {
    this.ruta = '';
  }
  // Code here ...
}
```

### createPath(...) & getCreatePath(...)<a name="id4"></a>

Con esta función se podrá establecer la ruta en la que se encuentran las notas dependiendo del usuario.

```typescript
  private createPath(usuario: string): void {
    this.ruta = `./Notes/${usuario}`;
  }
```

>> Nota: Para poder realizar las pruebas de esta función se debe crear una función pública que llame a la función **createPath(...)**, ya que esta última es privada.

```typescript
  public getCreatePath(usuario: string) {
    return this.createPath(usuario);
  }
```

### addDir() & getAddDir()<a name="id5"></a>

Con esta función se podrá crear el directorio correspondiente al usuario que quiera administrar sus notas. 

```typescript
  private addDir(): void {
    if (!fs.existsSync(this.ruta)) {
      fs.mkdirSync(this.ruta);
    }
  }
```

>> Nota: Para poder realizar las pruebas de esta función se debe crear una función pública que llame a la función **addDir()**, ya que esta última es privada.
  
```typescript
  public getAddDir() {
    return this.addDir();
  }
```

### searchNote(...) & getSearchNote(...)<a name="id6"></a>

Con esta función se podrá analizar y comprobar si la nota ya existe en el directorio del usuario.

```typescript
  private searchNote(title: string): boolean {
    if (fs.existsSync(`${this.ruta}/${title}.json`)) {
      return true;
    }
    return false;
  }
```

>> Nota: Para poder realizar las pruebas de esta función se debe crear una función pública que llame a la función **searchNote(...)**, ya que esta última es privada.
  
```typescript
  getSearchNote(title: string) {
    return this.searchNote(title);
  }
```

### printNote(...) & getPrint(...)<a name="id7"></a>

Gracias a esta función, el usuario podrá visualizar la nota elegida según el formato establecido. 

```typescript
  private printNote(title: string, body: string, color: string): void {
    const text = `${title}\n${body}`;
    if (color === 'red' || color === 'rojo') {
      console.log(chalk.red(text));
    } else if (color === 'green' || color === 'verde') {
      console.log(chalk.green(text));
    } else if (color === 'blue' || color === 'azul') {
      console.log(chalk.blue(text));
    } else if (color === 'yellow' || color === 'amarillo') {
      console.log(chalk.yellow(text));
    } else {
      console.log(chalk.white(text));
      console.log(chalk.red(`El color ${color} no disponible`));
    }
  }
```

>> Nota: Para poder realizar las pruebas de esta función se debe crear una función pública que llame a la función **printNote(...)**, ya que esta última es privada.
  
```typescript
  public getPrint(title: string, body: string, color: string) {
    return this.printNote(title, body, color);
  }
```

### addNote(...)<a name="id8"></a>

Haciendo uso de esta función, el usuario podrá añadir una nueva nota al sistema. La nota se guardará con las especificaciones que el usuario indique en la línea de comandos a la hora de crearla. Además, en caso de que la nota ya exista, se mostrará un mensaje de error.

  - **user**: Autor de la nota.
  - **title**: Título de la nota.
  - **body**: Cuerpo de la nota.
  - **col**: Color de la nota.

```typescript
  public addNote(user: string, title: string, body: string, col: string): void {
    this.createPath(user);
    this.addDir();
    const filePath = `${this.ruta}/${title}.json`;
    if (!this.searchNote(title)) {
      fs.writeFileSync(filePath, JSON.stringify({
        title: title,
        body: body,
        color: col,
      }));
      console.log(chalk.green('Nota guardada correctamente'));
    } else {
      console.log(chalk.red('La nota ya existe'));
    }
  }
```

### editNote(...)<a name="id9"></a>

A partir de esta función, el usuario podrá editar cualquiera de las notas que se encuentren en el directorio del usuario. En caso de no existir la nota se mostrará un mensaje de error.

  - **user**: Autor de la nota.
  - **title**: Título de la nota.
  - **bod**: Cuerpo de la nota.
  - **col**: Color de la nota.

```typescript
  public editNote(user: string, title: string, bod: string, col: string): void {
    this.createPath(user);
    if (this.searchNote(title)) {
      const filePath = `${this.ruta}/${title}.json`;
      const note_ = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      note_.body = bod;
      note_.color = col;
      fs.writeFileSync(filePath, JSON.stringify(note_));
      console.log(chalk.green('Nota actualizada correctamente'));
    } else {
      console.log(chalk.red('La nota no existe'));
    }
  }
```

### deleteNote(...)<a name="id10"></a>

Con este método, el usuario podrá eliminar cualquiera de las notas que se encuentren en el directorio de este. En caso de no existir la nota se mostrará un mensaje de error.

  - **user**: Autor de la nota.
  - **title**: Título de la nota.

```typescript
  public deleteNote(user: string, title: string): void {
    this.createPath(user);
    if (this.searchNote(title)) {
      const filePath = `${this.ruta}/${title}.json`;
      fs.unlinkSync(filePath);
      console.log(chalk.green('Nota eliminada correctamente'));
    } else {
      console.log(chalk.red('La nota no existe'));
    }
  }
```

### listNotes(...)<a name="id11"></a>

Con este método, el usuario podrá mostrar los títulos de todas las notas que se encuentren en el directorio de este. En caso de no existir ninguna nota se mostrará un mensaje de error o, en caso de que el usuario no exista también se mostrará un mensaje de error.

  - **user**: Autor de la nota.

```typescript
  public listNotes(user: string): void {
    this.createPath(user);
    if (fs.existsSync(this.ruta)) {
      const notes = fs.readdirSync(this.ruta);
      if (notes.length === 0) {
        console.log(chalk.red('El usuario no tiene notas'));
      } else {
        console.log(chalk.green('Listado de notas:'));
        notes.forEach((note) => {
          console.log(chalk.white(note));
        });
      }
    } else {
      console.log(chalk.red('El usuario no existe'));
    }
  }
```

### readNote(...)<a name="id12"></a>

Con este método, el usuario podrá leer el contenido de una nota que se encuentren en el directorio de este. En caso de no existir la nota se mostrará un mensaje de error. 

  - **user**: Autor de la nota.
  - **title**: Título de la nota.

```typescript
  public readNote(user: string, title: string): void {
    this.createPath(user);
    if (this.searchNote(title)) {
      const note = fs.readFileSync(`${this.ruta}/${title}.json`, 'utf-8');
      const note_ = JSON.parse(note);
      const body = note_.body;
      const color = note_.color;
      this.printNote(title, body, color);
    } else {
      console.log(chalk.red('La nota no existe'));
    }
  }
```

## Fichero NoteApp.ts<a name="id13"></a>

En este fichero ([NoteApp.ts](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101339887/blob/main/src/EjercicioP11/AppCode/NoteApp.ts)) podremos encontrar todos los comandos que el usuario podrá ejecutar en la aplicación. Entre ellos podremos encontrar algunos comandos como por ejemplo: `add`, `list`, `read`, `edit` y `delete`.

### Comando Add<a name="id14"></a>

A la hora de ejecutar este comando, el usuario tendrá que añadir los siguientes parámetros:

  - **user**: Autor de la nota.
  - **title**: Título de la nota.
  - **body**: Cuerpo de la nota.
  - **color**: Color de la nota.

```typescript
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
    // code here ...
  },
});
```

### Comando Edit<a name="id15"></a>

A la hora de ejecutar este comando, el usuario tendrá que añadir los siguientes parámetros:

  - **user**: Autor de la nota.
  - **title**: Título de la nota.
  - **body**: Cuerpo de la nota.
  - **color**: Color de la nota.

```typescript
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
    // code here ...
  },
});
```

### Comando Delete<a name="id16"></a>

A la hora de ejecutar este comando, el usuario tendrá que añadir los siguientes parámetros:
  
  - **user**: Autor de la nota.
  - **title**: Título de la nota.
  
```typescript
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
    // code here ...
  },
});
```
### Comando List<a name="id17"></a>

A la hora de ejecutar este comando, el usuario tendrá que añadir los siguientes parámetros:
    
  - **user**: Autor de la nota.
  
```typescript
  yargs.command({
  command: 'list',
  describe: 'Lista las notas del directorio del usuarios',
  builder: {
    user: {
      describe: 'Autor de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    // code here ...
  },
});
```

### Comando Read<a name="id18"></a>

A la hora de ejecutar este comando, el usuario tendrá que añadir los siguientes parámetros:

  - **user**: Autor de la nota.
  - **title**: Título de la nota.

```typescript
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
    // code here ...
  },
});
```

>> En el handler de cada uno de los comandos, se enviará el mensaje con el comando al servidor y, posteriormente, el servidor se encargará de crear la nota en el directorio de este. Por otro lado, en caso de que surja un error, se mostrará un mensaje de error.

```typescript
yargs.command({
  // code here ...
  handler: (argv) => {
    if (typeof argv.title === 'string' &&
        typeof argv.body === 'string' &&
        typeof argv.user === 'string' &&
        typeof argv.color === 'string') {
      console.log('Editando nota...'); // Mensaje de espera
      noteManage.editNote(argv.user, argv.title, argv.body, argv.color);
    }
  },
});
```

## Fichero Client<a name="id19"></a>

En este fichero se encuentra la clase ClientEmiter, que se encarga de conectar un cliente con el servidor. 

```typescript
export class Client extends EventEmitter {
  constructor(event: EventEmitter) {
    super();
    // code here ...
  }
}
```

Para ello se analizarán cuatro eventos distintos:

  - **data**: Cuando se manda un mensaje.
    ```typescript
    let msj = '';
    event.on('data', (data) => {
      msj += data.toString();
    });
    ```

  - **end**: Cuando se ha finalizado el envío de datos.
    ```typescript
    event.on('end', () => {
      this.emit('response', msj);
      console.log(msj);
    });
    ```

  - **close**: Cuando se cierra la conexión.
    ```typescript
    event.on('close', () => {
      console.log('Conexión cerrada');
    });
    ```

  - **error**: Cuando se produce un error.
    ```typescript
    event.on('error', (err) => {
      console.log(err);
    });
    ```

## Fichero Server<a name="id20"></a>

En este fichero se encontrará creada la clase Server, que se encarga de escuchar en un puerto determinado y, cuando se conecta un cliente, dependiendo de la acción que se le indique, se ejecutará una función. Por otra parte, en caso de que se produzca un error, se mostrará un mensaje de error.

```typescript
export class Server {
  private server;
  constructor(private port: number) {
    this.server = net.createServer((socket) => {
      // code here ...
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor iniciado');
    });
  }
}
```

Algunos de los eventos que se escuchan desde el servidor son los siguientes:

  - Evendo **data**: Este evento se activa cuando se recibe un mensaje. 

    ```typescript
      let msj: string = '';
      socket.on('data', (data) => {
        msj += data;
        const cmd = JSON.parse(msj);
        const manage = new NoteManage();
        console.log('  El cliente envió: ' + cmd._[0].toString());
        // code here ...
        console.log('Respuesta enviada');
        socket.end();
      });
    ```
  
  Las funciones que se ejecutan son:

    - **add**: Se añade una nota.
      ```typescript
        if (cmd._[0] === 'add') {
          manage.addNote(cmd.user, cmd.title, cmd.body, cmd.color);
        }
      ```
    
    - **edit**: Se edita una nota.
      ```typescript
        else if (cmd._[0] === 'edit') {
          manage.editNote(cmd.args[0], cmd.args[1], cmd.args[2], cmd.args[3]);
        }
      ```

    - **delete**: Se elimina una nota.
      ```typescript
        else if (cmd._[0] === 'delete') {
          manage.deleteNote(cmd.args[0], cmd.args[1]);
        }
      ```
    
    - **list**: Se listan las notas.
      ```typescript
        else if (cmd._[0] === 'list') {
          manage.listNotes(cmd.args[0]);
        }
      ```

    - **read**: Se lee una nota.
      ```typescript
        else if (cmd._[0] === 'read') {
          manage.readNote(cmd.args[0], cmd.args[1]);
        }
      ```

>> En caso de que el usuario no introduzca un comando válido, se mostrará un mensaje de error.

```typescript
console.log('Comando no reconocido');
socket.write('Comando no reconocido');
```

A partir de esto de creará una instancia de ServerEmitter, que se encargará de conectar el servidor y ponerlo a la espera de que algún usuario se conecte.

```typescript
const srv = new Server(3000);
srv.listen();
```

# EJEMPLOS DE EJECUCIÓN<a name="id21"></a>

## Servidor<a name="id22"></a>

```bash
$ node dist/EjercicioP11/Server.js
```

## Cliente<a name="id23"></a>

```bash
$node dist/EjercicioP11/AppCode/NoteApp.js add --user="Usuario" --title="Red note" --body="This is a red note" --color="red"
$node dist/EjercicioP11/AppCode/NoteApp.js list --user="Usuario"
$node dist/EjercicioP11/AppCode/NoteApp.js read --user="Usuario" --title="Red note"
$node dist/EjercicioP11/AppCode/NoteApp.js remove --user="Usuario" --title="Red note"
```

# CONCLUSIÓN<a name="id24"></a>

En conclusión, podemos comentar que gracias a la librería `yargs` podemos crear una aplicación de notas, que nos permita añadir, leer, eliminar y listar notas.

Además de esto, es posible visualizar los mensajes de error e informativos asignándoles el color que queramos gracias a la librería `chalk`. 

Por otro lado, gracias a las funciones asincrónicas de Node.js, podemos crear un servidor que nos permita crear una nota, leer una nota, eliminar una nota y listar las notas. Es decir que el cliente interactúa con el servidor pidiendo una acción y el servidor se encarga de ejecutarla.