// Write your "projects" router here!
const express = require('express')
const Projects = require(`./projects-model`)
//middleware:
const { validateProjectId } = require(`./projects-middleware`)

const router = express.Router()


router.get(`/projects`, (req, res, next) => {
   Projects.get()
      .then(action => {
         res.status(200).json(action)
      })
      .catch(next)
})

router.get(`/projects/:id`, validateProjectId, (req, res, next) => {
   Projects.get(req.params.id)
      .then(action => {
         res.status(200).json(action)
      })
      .catch(next)
})

// router.post(`/projects`, (req, res, next) => {

// })


module.exports = router