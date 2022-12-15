const express = require('express');
const server = express();
const actionsRouter = require(`./actions/actions-router`)
const projectsRouter = require(`./projects/projects-router`)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(`/api`, actionsRouter)
server.use(`/api`, projectsRouter)

server.get(`/`, (req, res) => {
   res.json(`It's running correctly! Good job!`)
})

server.use((err, req, res, next) => {
   res.status(err.status || 500).json(
      { message: err.message || `Internal server error` }
   )
})

module.exports = server;
