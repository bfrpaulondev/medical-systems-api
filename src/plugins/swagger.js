const fp = require('fastify-plugin');
const swagger = require('@fastify/swagger');

module.exports = fp(async (fastify, opts) => {
  fastify.register(swagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Medical Systems API',
        description: 'API completa para sistemas médicos com 20+ funcionalidades',
        version: '1.0.0'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  });
});
