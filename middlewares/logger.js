// middlewares/logger.js
module.exports = async function (request, reply) {
    request.log.info(`${request.method} ${request.url}`);
  };
  