const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true , 'El titulo es obligatorio'],
        minlength: [5, 'El titulo debe tener al menos 5 caracteres.'],
    },
    text: {
        type: String,
        required: [true, 'El texto es obligatorio.'],
        minlength: [5, 'El texto debe tener al menos 5 caracteres.'],
    },
    author: {
        type: String,
        required: [true, 'El autor es obligatorio'],
    },
}, { timestamps: true }); 

const Post = mongoose.model ('Post', postSchema);

module.exports = Post;
