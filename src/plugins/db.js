const fp = require('fastify-plugin');
const mongoose = require('mongoose');

module.exports = fp(async (fastify, opts) => {
  const uri = process.env.MONGO_URI || 'mongodb+srv://host:hostpass123@cluster0.fwrzxuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  try {
    await mongoose.connect(uri);
    fastify.log.info('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    fastify.log.error('Erro de conexão com o MongoDB:', err);
    throw err;
  }
});

