nodepop
=======

## Instrucciones para correr la aplicacion

1. Instalamos las dependencias
```
    $ npm install
```
2. Si se quiere empezar al aplicacion con algunos datos precargados en la base de datos
```
    $ npm run install_db
```
3. Lanzamos aplicacion
```
    $ npm start
```
o en modo debug
```
    $ npm run dev
```
4. La direccion de la aplicacion es [http://localhost:3000](http://localhost:3000)

5. Para checkear la calidad de los scripts con ESLint
```
    $ npm run eslint ejemplo-directorio/archivo-scripts.js
```

## Instrucciones para ver la documentacion de la API

Con la Nodepop corriendo ...

1. La primera vez, debemos instalar las dependencias propias de la documentacion
```
    $ cd iodocs
    $ npm install
```

2. Para ver la documentacion, en otra terminal levatamos un servidor redis
```
    $ redis-server
```

3. Lanzamos la aplicacion desde el directorio de iodocs
```
    $ npm start
```

6. La direccion de la documentacion es [http://localhost:3001](http://localhost:3001)

7. Login
```
    user: root
    password: root
```