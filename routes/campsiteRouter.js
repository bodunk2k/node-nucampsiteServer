const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')

.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next(); //passes control to the next valid actions after this one.
})

.get((req,res) => {
    res.end('Will send all the campsites to you');
})

.post( (req,res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.delete( (req,res) => {
    res.end('Deleting all campsites');
})

.put((req,res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

campsiteRouter.route('/:campsiteId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next(); //passes control to the next valid actions after this one.
})

.get((req,res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})

.post( (req,res) => {
    res.end(`POST operation not supported on campsite: ${req.params.campsiteId}`);
})

.delete( (req,res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
})

.put((req,res) => {
    res.statusCode = 403;
    res.end(`Updating the campsite: ${req.params.campsiteId}\n`);
});
module.exports = campsiteRouter;
