const express = require('express');
const service = require('../services/service');

const router = new express.Router();


/**
 * Безвозвратное удаление всей пользовательской информации из 
 * базы данных.
 * 
 */
router.post('/clear', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await service.clear(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Получение инфомарции о базе данных.
 * 
 */
router.get('/status', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await service.status(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
