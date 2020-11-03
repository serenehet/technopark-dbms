const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {Object} options.forum Данные форума.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.forumCreate = async (options) => {
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
    data: 'forumCreate ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug Идентификатор форума.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.forumGetOne = async (options) => {
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
    data: 'forumGetOne ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug Идентификатор форума.
 * @param {Object} options.thread Данные ветки обсуждения.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.threadCreate = async (options) => {
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
    data: 'threadCreate ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug Идентификатор форума.
 * @param {Number} options.limit Максимальное кол-во возвращаемых записей.
 * @param {String} options.since Идентификатор пользователя, с которого будут выводиться пользоватли(пользователь с данным идентификатором в результат не попадает).
 * @param {Boolean} options.desc Флаг сортировки по убыванию.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.forumGetUsers = async (options) => {
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
    data: 'forumGetUsers ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug Идентификатор форума.
 * @param {Number} options.limit Максимальное кол-во возвращаемых записей.
 * @param {String} options.since Дата создания ветви обсуждения, с которой будут выводиться записи(ветвь обсуждения с указанной датой попадает в результат выборки).
 * @param {Boolean} options.desc Флаг сортировки по убыванию.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.forumGetThreads = async (options) => {
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
    data: 'forumGetThreads ok!'
  };
};

