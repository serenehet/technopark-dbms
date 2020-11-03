const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {Number} options.id Идентификатор сообщения.
 * @param {Array} options.related Включение полной информации о соответвующем объекте сообщения.Если тип объекта не указан, то полная информация об этих объектах непередаётся.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postGetOne = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'postGetOne ok!'
  };
};

/**
 * @param {Object} options
 * @param {Number} options.id Идентификатор сообщения.
 * @param {Object} options.post Изменения сообщения.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postUpdate = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'postUpdate ok!'
  };
};

