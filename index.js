const express = require('express');
const connectDB = require('./config/db.config');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes'); // <-- NUEVO

const app = express();
const PORT = 8000;

app.use(express.json());

connectDB();

app.use('/api/posts', postRoutes);
app.use('/api', userRoutes); // <-- NUEVO: conecta las rutas de usuario

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
