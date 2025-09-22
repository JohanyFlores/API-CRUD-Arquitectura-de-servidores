const express = require ('express');
const connectDB = require ('./config/db.config');
const postRoutes = require ('./routes/post.routes');

const app = express ();
const PORT = 8000;

app.use (express.json());


connectDB ();

app.use('/api/posts', postRoutes);


app.listen (PORT, () => {
    console.log ('Servidor Express corriendo en el puerto ${PORT}');
});