// index.js
const path = require('path');
const fs = require('fs');
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastifySwagger = require('fastify-swagger');

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/yourdbname'; // Change as needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => fastify.log.info('Connected to MongoDB'))
  .catch(err => fastify.log.error(err));

// Register Swagger (using fastify-swagger)
fastify.register(fastifySwagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Medical Systems API',
      description: 'API for managing patients, doctors, appointments, histories, prescriptions, billing, laboratory results, medications, reports, alerts, teleconsultations, branches, integrations and dashboard',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  exposeRoute: true
});

// -------------------------
// Auto-load Middlewares
// -------------------------
const middlewaresPath = path.join(__dirname, 'middlewares');
if (fs.existsSync(middlewaresPath)) {
  fs.readdirSync(middlewaresPath).forEach(file => {
    if (file.endsWith('.js')) {
      const middleware = require(path.join(middlewaresPath, file));
      // For logger middleware, register onRequest hook
      if (file === 'logger.js') {
        fastify.addHook('onRequest', middleware);
        fastify.log.info(`Middleware loaded: ${file}`);
      }
      // For auth middleware, register as a global preHandler (it will check for exceptions)
      if (file === 'auth.js') {
        fastify.addHook('preHandler', middleware);
        fastify.log.info(`Middleware loaded: ${file}`);
      }
    }
  });
}

// -------------------------
// Auto-load Routes (Custom routes)
// -------------------------
const routesPath = path.join(__dirname, 'routes');
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith('.js')) {
      fastify.register(require(path.join(routesPath, file)));
      fastify.log.info(`Route loaded: ${file}`);
    }
  });
}

// -------------------------
// Auto-load Controllers (for standard CRUD endpoints)
// -------------------------
const controllersPath = path.join(__dirname, 'controllers');
if (fs.existsSync(controllersPath)) {
  fs.readdirSync(controllersPath).forEach(file => {
    if (file.endsWith('Controller.js')) {
      const controller = require(path.join(controllersPath, file));
      // Derive base route from filename (e.g., PatientController.js → /patients)
      const baseName = file.replace('Controller.js', '').toLowerCase() + 's';
      
      // Register standard CRUD routes
      fastify.route({
        method: 'GET',
        url: `/${baseName}`,
        handler: controller.index,
        schema: {
          tags: [baseName.charAt(0).toUpperCase() + baseName.slice(1)]
        }
      });
      fastify.route({
        method: 'GET',
        url: `/${baseName}/:id`,
        handler: controller.show,
        schema: {
          tags: [baseName.charAt(0).toUpperCase() + baseName.slice(1)]
        }
      });
      fastify.route({
        method: 'POST',
        url: `/${baseName}`,
        handler: controller.create,
        schema: {
          tags: [baseName.charAt(0).toUpperCase() + baseName.slice(1)]
        }
      });
      fastify.route({
        method: 'PUT',
        url: `/${baseName}/:id`,
        handler: controller.update,
        schema: {
          tags: [baseName.charAt(0).toUpperCase() + baseName.slice(1)]
        }
      });
      fastify.route({
        method: 'DELETE',
        url: `/${baseName}/:id`,
        handler: controller.delete,
        schema: {
          tags: [baseName.charAt(0).toUpperCase() + baseName.slice(1)]
        }
      });
      fastify.log.info(`Controller loaded and routes registered: ${file} at /${baseName}`);
    }
  });
}

// -------------------------
// Start Fastify Server
// -------------------------
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.swagger();
    fastify.log.info('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
