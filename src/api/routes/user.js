const express = require('express');
const user = require('../services/user');

const router = new express.Router();

/**
 * Создание нового пользователя в базе данных.
 * 
 */
router.post('/:nickname/create', async (req, res, next) => {
  const options = {
    nickname: req.params['nickname'],
    profile: req.body['profile']
  };

  try {
    const result = await user.userCreate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
//  информации о пользователе форума по его имени.
router.get('/:nickname/profile', async (req, res, next) => {
  const options = {
    nickname: req.params['nickname']
  };

  try {
    const result = await user.userGetOne(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Изменение информации в профиле пользователя.
 * 
 */
router.post('/:nickname/profile', async (req, res, next) => {
  const options = {
    nickname: req.params['nickname'],
    profile: req.body['profile']
  };

  try {
    const result = await user.userUpdate(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
