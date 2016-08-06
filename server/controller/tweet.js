var Tweet = require('./../models/tweet');
module.exports = {
    create: function(req, res) {
        var tweet = new Tweet(req.body);

        tweet
            .save()
            .then(function(result) {
                if (!result) {
                    return res.status(400).json({
                        status: false,
                        data  : {}
                    });
                }

                return res.status(200).json({
                    status: true,
                    data  : result
                });
            })
            .catch(function(err) {
                return res.status(500).json({
                    status: true,
                    data  : err
                });
            })
    },
    find: function(req, res) {
        var find = Tweet.find({}).exec();

        find
            .then(function(result){
                if (!result) {
                    return res.status(404)
                              .json({
                                  status: false,
                                  data: {}
                              });

                }
                return res.status(200)
                          .json({
                              status: true,
                              data: result
                          });
            })
            .catch(function(err){
                return res.status(500)
                          .json({
                              status: false,
                              data: err
                          });
            })
    },
    love: function(req, res) {
        var total = req.body.love.total + 1;
        req.body.love.total = total;
        var update = Tweet.update({
            _id: req.params.id
        }, {
            $set: {
                'love.total': total,
                'love.status': true
            }
        }).exec();

        update
            .then(function(result) {
                return res.status(200)
                    .json({
                        status: true,
                        data: req.body
                    });
            })
            .catch(function(err) {
                return res.status(500)
                    .json({
                        status: false,
                        data: err
                    });
            });
    }
};