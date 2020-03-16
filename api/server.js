const express = require("express");
const server = express();
// ADD router
const accountRouter = require('../routers/accountsRouter');

server.use(express.json());
// ADD link to router
server.use('/api/accounts', accountRouter);
module.exports = server;
