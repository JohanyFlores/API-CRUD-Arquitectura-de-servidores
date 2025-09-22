const Post = require('../models/post.model');

// Crear un post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts.' });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("PATCH Error:", error);

    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido.' });
    }
    res.status(500).json({ error: error.message });
  }
};
