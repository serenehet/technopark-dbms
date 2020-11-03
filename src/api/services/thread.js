const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {String} options.slug_or_id Идентификатор ветки обсуждения.
 * @param {Array} options.posts Список создаваемых постов.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.postsCreate = async (options) => {
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
    data: 'postsCreate ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug_or_id Идентификатор ветки обсуждения.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.threadGetOne = async (options) => {
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
    data: 'threadGetOne ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug_or_id Идентификатор ветки обсуждения.
 * @param {Object} options.thread Данные ветки обсуждения.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.threadUpdate = async (options) => {
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
    data: 'threadUpdate ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug_or_id Идентификатор ветки обсуждения.
 * @param {Number} options.limit Максимальное кол-во возвращаемых записей.
 * @param {Number} options.since Идентификатор поста, после которого будут выводиться записи(пост с данным идентификатором в результат не попадает).
 * @param {String} options.sort Вид сортировки: * flat - по дате, комментарии выводятся простым списком в порядке создания; * tree - древовидный, комментарии выводятся отсортированные в дереве   по N штук; * parent_tree - древовидные с пагинацией по родительским (parent_tree),   на странице N родительских комментов и все комментарии прикрепленные   к ним, в древвидном отображение.Подробности: https://park.mail.ru/blog/topic/view/1191/
 * @param {Boolean} options.desc Флаг сортировки по убыванию.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.threadGetPosts = async (options) => {
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
    data: 'threadGetPosts ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.slug_or_id Идентификатор ветки обсуждения.
 * @param {Object} options.vote Информация о голосовании пользователя.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.threadVote = async (options) => {
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
    data: 'threadVote ok!'
  };
};

