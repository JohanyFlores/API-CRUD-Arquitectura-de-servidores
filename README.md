API CRUD para Posts
Este proyecto es una API RESTful desarrollada con Node.js y Express.js para gestionar recursos de tipo "Post". La API implementa las operaciones básicas de un CRUD (Crear, Leer, Actualizar, Borrar) y utiliza Mongoose para interactuar con una base de datos en memoria (MongoMemoryServer).

1. Requisitos
Asegúrate de tener instalado lo siguiente:

Node.js (versión 14.x o superior)

npm (se instala con Node.js)

Git

Postman (para probar los endpoints de la API)


2. Instalación
Para configurar el proyecto localmente, sigue estos pasos:

Clona el repositorio:

git clone <(https://github.com/JohanyFlores/API-CRUD-Arquitectura-de-servidores.git)>

Navega al directorio del proyecto:

cd Api-AS

Instala las dependencias:


npm install

3. Uso

El proyecto se ejecuta en el puerto 8000 por defecto.

Iniciar el servidor
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando en la terminal:

npm start

El servidor estará disponible en http://localhost:8000.

Endpoints de la API
Todos los endpoints tienen el prefijo /api/posts. A continuación, se detallan las operaciones disponibles:

Método	Endpoint	Descripción
POST	/api/posts	Crea un nuevo post.
GET	/api/posts	Obtiene el listado de todos los posts.
GET	/api/posts/:id	Obtiene los detalles de un post específico.
PATCH	/api/posts/:id	Actualiza los detalles de un post.
DELETE	/api/posts/:id	Elimina un post específico.

4. Estructura del Proyecto
El proyecto sigue un patrón de diseño MVC (Modelo-Vista-Controlador), adaptado para una API RESTful. La estructura de carpetas es la siguiente:

.
├── config/                  # Archivos de configuración
│   └── db.config.js         # Configuración de la conexión a la base de datos
├── controllers/             # Lógica de la API (controladores)
│   └── post.controller.js   # Funciones para las operaciones CRUD
├── models/                  # Esquemas de Mongoose (modelos de datos)
│   └── post.model.js        # Esquema del modelo "Post"
├── routes/                  # Rutas de la API
│   └── post.routes.js       # Rutas para el modelo "Post"
├── .gitignore               # Archivos ignorados por Git
├── index.js                 # Punto de entrada de la aplicación
├── package.json             # Metadatos y dependencias del proyecto
└── README.md                # Archivo de documentación


5. Colección de Postman


Se adjunta una colección de Postman (Api-AS .json) para facilitar las pruebas de todos los endpoints. Para usarla, impórtala en Postman y sigue este flujo de trabajo:

Ejecuta el servidor (npm start).

Ejecuta la petición POST para crear un nuevo post.

Copia el _id de la respuesta JSON del post creado.

Utiliza ese _id para probar las peticiones GET (por ID), PATCH y DELETE.


