var User = require('./../models/user');
var jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res) {
        var user = new User(req.body);

        user
            .save()
            .then(function(result) {
                if (!result) {
                    return res.status(400)
                        .json({
                            status: false,
                            data  : {}
                        });

                }

                return res.status(200)
                    .json({
                        status: true,
                        data: result
                    })
            })
            .catch(function(err) {
                return res.status(500)
                    .json({
                        status: false,
                        data  : err
                    });
            });
    },
    signin: function(req, res) {
        var findOne = User.findOne({
            email: req.body.email,
            password: req.body.password
        }).exec();

        findOne
            .then(function(result) {
               if (!result) {
                   return res.status(404)
                       .json({
                           status: false,
                           data: {}
                       });
               }

                var token = jwt.sign({
                    id: result._id
                }, 'SCHOOLOFNET!@#$%&');

                delete result.password;

                return res.status(200)
                    .json({
                        status: true,
                        data: {
                            token: token,
                            user : result
                        }
                    });
            })
            .catch(function(err) {
                return res.status(500)
                    .json({
                        status: false,
                        data: {}
                    });
            });
    }
};