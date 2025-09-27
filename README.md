# API CRUD Arquitectura de Servidores

## 🚀 Nuevas Funcionalidades en `feature/login-usuarios`

Esta rama incluye la implementación de **autenticación de usuarios** usando **JWT** y la **protección de rutas sensibles** en la API.  
Ahora, solo los usuarios autenticados pueden crear, editar, borrar o consultar publicaciones.

---

## 🛡️ Autenticación y Seguridad

- **Registro de usuarios:**  
  Ruta `POST /api/users`  
  Permite crear nuevos usuarios sin autenticación previa.

- **Login de usuarios:**  
  Ruta `POST /api/login`  
  Los usuarios pueden autenticarse y reciben un token JWT válido por 2 horas.

- **Protección de rutas:**  
  Todas las rutas relacionadas con publicaciones (`/api/posts`) requieren que el usuario envíe su token JWT en la cabecera `Authorization`.  
  Ejemplo:  
  ```
  Authorization: Bearer <tu-token-jwt>
  ```

- **Expiración:**  
  El token expira a las 2 horas y será necesario volver a iniciar sesión.

---

## 📚 Endpoints protegidos

| Método | Endpoint             | Descripción                        | Requiere JWT |
|--------|----------------------|------------------------------------|:------------:|
| POST   | `/api/posts`         | Crear nueva publicación            | ✅          |
| GET    | `/api/posts`         | Listar todas las publicaciones     | ✅          |
| GET    | `/api/posts/:id`     | Consultar publicación por ID       | ✅          |
| PATCH  | `/api/posts/:id`     | Editar publicación                 | ✅          |
| DELETE | `/api/posts/:id`     | Eliminar publicación               | ✅          |

---

## 🧪 Cómo probar la autenticación

1. **Registra un usuario:**  
   Haz una petición POST a `/api/users` con `name`, `email`, `password` y `bio`.

2. **Haz login:**  
   Haz una petición POST a `/api/login` con el `email` y `password`, guarda el token recibido.

3. **Haz peticiones protegidas:**  
   Usa el token en la cabecera `Authorization` para acceder a las rutas de `/api/posts`.

   Ejemplo en cURL:
   ```bash
   curl -X POST http://localhost:8000/api/posts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <tu-token-jwt>" \
     -d '{"title":"Mi post","content":"Contenido"}'
   ```

   Si no envías el token o es inválido, el servidor responderá con error 401.

---

## ✅ Requisitos

- Node.js y MongoDB instalados.
- Variables de entorno para `JWT_SECRET` si lo deseas personalizar.

---

## 📝 Notas

- El token JWT **no** se guarda en la base de datos, sólo el cliente lo almacena y lo envía en cada request.
- El middleware de seguridad se encuentra en `middleware/secure.middleware.js`.

---

## 👨‍💻 Autor

Johany Flores  
[GitHub Profile](https://github.com/JohanyFlores)

---

¿Te gustaría agregar ejemplos para Postman, roles de usuario, o alguna sección extra?
