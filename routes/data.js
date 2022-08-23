var express = require('express');
var router = express.Router();
var method = require('./method/datas')

router.get('/', method.index)
router.get('/:id', method.indexById)
router.post('/', method.post)
router.put('/:id', method.editById)
router.delete('/:id', method.deleteById)


module.exports = router;