// Write your "projects" router here!
const express = require('express')
const Projects = require(`./projects-model`)
//middleware:
const { validateProjectId, validateProjects } = require(`./projects-middleware`)

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

router.post(`/projects`, validateProjects, (req, res, next) => {
   Projects.insert(req.body)
      .then(project => {
         console.log(project)
         res.status(201).json(project)
      })
      .catch(next)
})

router.put(`/projects/:id`, validateProjectId, validateProjects, (req, res, next) => {
   Projects.update(req.params.id, req.body)
      .then(project => {
         res.status(200).json(project)
      })
      .catch(next)
})

router.delete(`/projects/:id`, validateProjectId, (req, res, next) => {
   Projects.remove(req.params.id)
      .then((project) => {
         res.status(200).json()
      })
      .catch(next)
})

router.get(`/projects/:id/actions`, validateProjectId, (req, res, next) => {
   Projects.getProjectActions(req.params.id)
      .then(actions => {
         res.status(200).json(actions)
      })
      .catch(next)
})

module.exports = router