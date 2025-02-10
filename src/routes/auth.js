const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');

module.exports = async function (fastify, opts) {
  // Registro de um novo staff
  fastify.post('/auth/register', {
    schema: {
      description: 'Registra um novo usuário staff',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['firstName', 'lastName', 'role', 'email', 'password'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          role: { type: 'string', enum: ['Doctor', 'Nurse', 'Receptionist', 'Admin'] },
          email: { type: 'string' },
          password: { type: 'string' },
          phone: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            staff: { type: 'object' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { firstName, lastName, role, email, password, phone } = request.body;
      const hash = await bcrypt.hash(password, 10);
      const staff = await Staff.create({ firstName, lastName, role, email, password: hash, phone });
      reply.code(201).send({ message: 'Staff registrado com sucesso', staff });
    } catch (err) {
      reply.code(500).send({ error: 'Erro ao registrar staff', details: err });
    }
  });

  // Login
  fastify.post('/auth/login', {
    schema: {
      description: 'Login para staff',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { email, password } = request.body;
      const staff = await Staff.findOne({ email });
      if (!staff) return reply.code(401).send({ error: 'Credenciais inválidas' });
      const match = await bcrypt.compare(password, staff.password);
      if (!match) return reply.code(401).send({ error: 'Credenciais inválidas' });
      const token = fastify.jwt.sign({ _id: staff._id, email: staff.email, role: staff.role });
      return { message: 'Login bem-sucedido', token };
    } catch (err) {
      reply.code(500).send({ error: 'Erro no login', details: err });
    }
  });
};
