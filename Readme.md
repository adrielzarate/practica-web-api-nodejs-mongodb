nodepop
=======

## Instrucciones para correr la aplicacion

1. Instalamos las dependencias
```
    $ npm install
```
2. En otra terminal levantamos mongod
```
    $ mongod
```
3. Y en otra mongo
```
    $ mongo
```
4. Si se quiere empezar con algunos datos precargados en la base de datos, hacemos (desde la terminal de la aplicacion)
```
    $ npm run install_db
```
5. Lanzamos Nodepop
```
    $ npm start
```
o en modo debug
```
    $ npm run dev
```
6. La aplicacion corre en [http://localhost:3000](http://localhost:3000)

7. Para checkear la calidad de los scripts con ESLint
```
    $ npm run eslint ejemplo-directorio/archivo-scripts.js
```

## Instrucciones para ver la documentacion de la API

Con Nodepop corriendo ...

1. La primera vez, debemos instalar las dependencias propias de la documentacion
```
    $ cd doc
    $ npm install
```

2. Para ver la documentacion, en otra terminal levatamos un servidor redis
```
    $ redis-server
```

3. Lanzamos la aplicacion desde el directorio de la documentacion
```
    $ npm start
```

6. La documentacion corre en [http://localhost:3001](http://localhost:3001)

7. Login
```
    user: root
    password: root
```