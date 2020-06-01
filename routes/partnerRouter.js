const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

partnerRouter.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next(); //passes control to the next valid actions after this one.
})

.get((req,res) => {
    res.end('Will send all the partners to you');
})

.post( (req,res) => {
    res.end(`Will add the partners: ${req.body.name} with description: ${req.body.description}`);
})

.delete( (req,res) => {
    res.end('Deleting all partners');
})

.put((req,res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
});

partnerRouter.route('/:partnerId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next(); //passes control to the next valid actions after this one.
})

.get((req,res) => {
    res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
})

.post( (req,res) => {
    res.end(`POST operation not supported on partner: ${req.params.partnerId}`);
})

.delete( (req,res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
})

.put((req,res) => {
    res.statusCode = 403;
    res.end(`Updating the partner: ${req.params.partnerId}\n`);
});
module.exports = partnerRouter;