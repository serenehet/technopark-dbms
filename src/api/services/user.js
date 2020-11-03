const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.nickname Идентификатор пользователя.
 * @param {Object} options.profile Данные пользовательского профиля.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.userCreate = async (options) => {
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
    data: 'userCreate ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.nickname Идентификатор пользователя.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.userGetOne = async (options) => {
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
    data: 'userGetOne ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.nickname Идентификатор пользователя.
 * @param {Object} options.profile Изменения профиля пользователя.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.userUpdate = async (options) => {
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
    data: 'userUpdate ok!'
  };
};

