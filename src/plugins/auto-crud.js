const fp = require('fastify-plugin');
const fs = require('fs');
const path = require('path');

function generateOpenAPISchemaFromMongoose(mongooseSchema) {
  const props = {};
  for (const [key, value] of Object.entries(mongooseSchema.paths)) {
    if (key === '__v') continue; // ignora campo interno
    const fieldType = value.instance;
    let openapiType = 'string';
    if (fieldType === 'String') openapiType = 'string';
    else if (fieldType === 'Number') openapiType = 'number';
    else if (fieldType === 'Boolean') openapiType = 'boolean';
    else if (fieldType === 'Date') openapiType = 'string';
    else if (fieldType === 'Array') openapiType = 'array';
    props[key] = { type: openapiType };
  }
  return { type: 'object', properties: props };
}

function createCrudRoutes(fastify, model) {
  const modelName = model.modelName.toLowerCase();
  const basePath = `/${modelName}s`;
  const openapiSchema = generateOpenAPISchemaFromMongoose(model.schema);

  // GET all
  fastify.get(basePath, {
    preHandler: [fastify.authenticate],
    schema: {
      summary: `Lista todos os ${modelName}s`,
      tags: [modelName],
      response: { 200: { type: 'array', items: openapiSchema } }
    }
  }, async (req, reply) => await model.find({}));

  // GET by ID
  fastify.get(`${basePath}/:id`, {
    preHandler: [fastify.authenticate],
    schema: {
      summary: `Retorna um ${modelName} pelo ID`,
      tags: [modelName],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      response: { 200: openapiSchema }
    }
  }, async (req, reply) => {
    const doc = await model.findById(req.params.id);
    if (!doc) reply.code(404).send({ error: `${modelName} não encontrado` });
    return doc;
  });

  // POST create
  fastify.post(basePath, {
    preHandler: [fastify.authenticate],
    schema: {
      summary: `Cria um novo ${modelName}`,
      tags: [modelName],
      body: openapiSchema,
      response: { 201: openapiSchema }
    }
  }, async (req, reply) => {
    const doc = await model.create(req.body);
    reply.code(201);
    return doc;
  });

  // PUT update
  fastify.put(`${basePath}/:id`, {
    preHandler: [fastify.authenticate],
    schema: {
      summary: `Atualiza completamente um ${modelName}`,
      tags: [modelName],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: openapiSchema,
      response: { 200: openapiSchema }
    }
  }, async (req, reply) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) reply.code(404).send({ error: `${modelName} não encontrado` });
    return doc;
  });

  // PATCH update
  fastify.patch(`${basePath}/:id`, {
    preHandler: [fastify.authenticate],
    schema: {
      summary: `Atualiza parcialmente um ${modelName}`,
      tags: [modelName],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      body: openapiSchema,
      response: { 200: openapiSchema }
    }
  }, async (req, reply) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) reply.code(404).send({ error: `${modelName} não encontrado` });
    return doc;
  });

  // DELETE remove
  fastify.delete(`${basePath}/:id`, {
    preHandler: [fastify.authenticate],
    schema: {
      summary: `Remove um ${modelName}`,
      tags: [modelName],
      params: { type: 'object', properties: { id: { type: 'string' } } },
      response: { 200: { type: 'object', properties: { message: { type: 'string' } } } }
    }
  }, async (req, reply) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    if (!doc) reply.code(404).send({ error: `${modelName} não encontrado` });
    return { message: `${modelName} removido com sucesso` };
  });
}

module.exports = fp(async (fastify, opts) => {
  const modelsDir = require('path').join(__dirname, '../models');
  const files = require('fs').readdirSync(modelsDir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const model = require(require('path').join(modelsDir, file));
    if (model && model.modelName) createCrudRoutes(fastify, model);
  }
});
