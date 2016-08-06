var express = require('express');
var router  = express.Router();
var controller = require('./../controller/tweet');

router.get('/', controller.find);
router.post('/', controller.create);
router.put('/:id', controller.love);

module.exports = router;
