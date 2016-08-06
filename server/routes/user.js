var express = require('express');
var router = express.Router();
var controller = require('./../controller/user');

router.post('/', controller.create);
router.post('/signin', controller.signin);
module.exports = router;
