const express = require('express');
const forum = require('../services/forum');

const router = new express.Router();

/**
 * Создание нового форума.
 * 
 */
router.post('/create', async (req, res, next) => {
  const options = {
    forum: req.body['forum']
  };

  try {
    const result = await forum.forumCreate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
//  информации о форуме по его идентификаторе.
router.get('/:slug/details', async (req, res, next) => {
  const options = {
    slug: req.params['slug']
  };

  try {
    const result = await forum.forumGetOne(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Добавление новой ветки обсуждения на форум.
 * 
 */
router.post('/:slug/create', async (req, res, next) => {
  const options = {
    slug: req.params['slug'],
    thread: req.body['thread']
  };

  try {
    const result = await forum.threadCreate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Получение списка пользователей, у которых есть пост или 
 * ветка обсуждения в данном форуме.
 * 
 * 
 * Пользователи выводятся отсортированные по nickname в порядке 
 * возрастания.
 * 
 * Порядок сотрировки должен соответсвовать побайтовому 
 * сравнение в нижнем регистре.
 * 
 */
router.get('/:slug/users', async (req, res, next) => {
  const options = {
    slug: req.params['slug'],
    limit: req.query['limit'],
    since: req.query['since'],
    desc: req.query['desc']
  };

  try {
    const result = await forum.forumGetUsers(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Получение списка ветвей обсужления данного форума.
 * 
 * 
 * Ветви обсуждения выводятся отсортированные по дате создания.
 * 
 */
router.get('/:slug/threads', async (req, res, next) => {
  const options = {
    slug: req.params['slug'],
    limit: req.query['limit'],
    since: req.query['since'],
    desc: req.query['desc']
  };

  try {
    const result = await forum.forumGetThreads(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
