const express = require('express');
const post = require('../services/post');

const router = new express.Router();


/**
 * Получение информации о ветке обсуждения по его имени.
 * 
 */
router.get('/:id/details', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    related: req.query['related']
  };

  try {
    const result = await post.postGetOne(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Изменение сообщения на форуме.
 * 
 * 
 * Если сообщение поменяло текст, то оно должно получить 
 * отметку `isEdited`.
 * 
 */
router.post('/:id/details', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    post: req.body['post']
  };

  try {
    const result = await post.postUpdate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
