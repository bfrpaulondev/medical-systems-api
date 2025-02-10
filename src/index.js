const fastify = require('fastify')({ logger: true });

// Registra plugins
fastify.register(require('./plugins/db'));
fastify.register(require('./plugins/swagger'));
fastify.register(require('./plugins/auth'));
fastify.register(require('./plugins/auto-crud'));

// Endpoints públicos de autenticação
fastify.register(require('./routes/auth'));

// Inicializa o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.swagger(); // Gera a documentação em /documentation
    fastify.log.info('Medical Systems API rodando na porta 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
