const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const { response } = require('express');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req,res) => res.sendStatus(200))
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Favorite.find({
        user: req.user._id
    })
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res, next) => {
    Favorite.findOne({
        user: req.user._id
    })
    .then(favorite => {
        if(favorite){
            req.body.forEach(fav => {
                if(!favorite.campsites.includes(fav._id)) {
                    favorite.campsites.push(fav._id);
                }
            });
           favorite.save()
           .then(favorites =>  {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            })
            .catch(err => next(err));
        } else {
            Favorite.create({
                user: req.user._id,
                campsites : req.body
            })
            .then (favorites =>  {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
            })
            .catch(err => next(err));

        }
    })
    .catch(err => next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Favorite.findOne({
        user: req.user._id
    })
    .then(favorite => {
        favorite.remove()
        .then(favorite =>  {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })
        .catch(err => next(err));
    } )
    .catch(err => next(err));
})

.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req,res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorite');
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req,res) => res.sendStatus(200))
.get(cors.cors,(req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorite');
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            if (!favorite.campsites.includes(req.params.campsiteId)) {
                favorite.campsites.push(req.params.campsiteId);
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('That campsite is already a favorite!');
            }
        } else {
            Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})


.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            const index = favorite.campsites.indexOf(req.params.campsiteId);
            if (index >= 0) {
                favorite.campsites.splice(index, 1);
            }
            favorite.save()
            .then(favorite => {
                Favorite.findById(favorite._id)
                .then(favorite => {
                    console.log('Favorite Campsite Deleted!', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            }).catch(err => next(err));
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
    }).catch(err => next(err))
})

.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorite');
});
module.exports = favoriteRouter;