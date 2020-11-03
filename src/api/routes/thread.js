const express = require('express');
const thread = require('../services/thread');

const router = new express.Router();

/**
 * Добавление новых постов в ветку обсуждения на форум.
 * 
 * 
 * Все посты, созданные в рамках одного вызова данного метода 
 * должны иметь одинаковую дату создания (Post.Created).
 * 
 */
router.post('/:slug_or_id/create', async (req, res, next) => {
  const options = {
    slug_or_id: req.params['slug_or_id'],
    posts: req.body['posts']
  };

  try {
    const result = await thread.postsCreate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Получение информации о ветке обсуждения по его имени.
 * 
 */
router.get('/:slug_or_id/details', async (req, res, next) => {
  const options = {
    slug_or_id: req.params['slug_or_id']
  };

  try {
    const result = await thread.threadGetOne(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Обновление ветки обсуждения на форуме.
 * 
 */
router.post('/:slug_or_id/details', async (req, res, next) => {
  const options = {
    slug_or_id: req.params['slug_or_id'],
    thread: req.body['thread']
  };

  try {
    const result = await thread.threadUpdate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Получение списка сообщений в данной ветке форуме.
 * 
 * 
 * Сообщения выводятся отсортированные по дате создания.
 * 
 */
router.get('/:slug_or_id/posts', async (req, res, next) => {
  const options = {
    slug_or_id: req.params['slug_or_id'],
    limit: req.query['limit'],
    since: req.query['since'],
    sort: req.query['sort'],
    desc: req.query['desc']
  };

  try {
    const result = await thread.threadGetPosts(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Изменение голоса за ветвь обсуждения.
 * 
 * 
 * Один пользователь учитывается только один раз и может 
 * изменить своё
 * 
 * мнение.
 * 
 */
router.post('/:slug_or_id/vote', async (req, res, next) => {
  const options = {
    slug_or_id: req.params['slug_or_id'],
    vote: req.body['vote']
  };

  try {
    const result = await thread.threadVote(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
