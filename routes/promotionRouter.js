const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next(); //passes control to the next valid actions after this one.
})

.get((req,res) => {
    res.end('Will send all the promotions to you');
})

.post( (req,res) => {
    res.end(`Will add the promotions: ${req.body.name} with description: ${req.body.description}`);
})

.delete( (req,res) => {
    res.end('Deleting all promotions');
})

.put((req,res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
});

promotionRouter.route('/:promotionId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next(); //passes control to the next valid actions after this one.
})

.get((req,res) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
})

.post( (req,res) => {
    res.end(`POST operation not supported on promotion: ${req.params.promotionId}`);
})

.delete( (req,res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
})

.put((req,res) => {
    res.statusCode = 403;
    res.end(`Updating the promotion: ${req.params.promotionId}\n`);
});
module.exports = promotionRouter;