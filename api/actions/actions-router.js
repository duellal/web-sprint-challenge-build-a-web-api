// Write your "actions" router here!
const express = require('express')
const Actions = require(`./actions-model`)
const { validateActionId, validateAction } = require(`./actions-middlware`)

const router = express.Router()


router.get(`/actions`, (req, res, next) => {
   Actions.get()
      .then(actions => {
         res.status(200).json(actions)
      })
      .catch(next)
})

router.get(`/actions/:id`, validateActionId, (req, res, next) => {
   Actions.get(req.params.id)
      .then(action => {
         res.status(200).json(action)
      })
      .catch(next)
})

router.post(`/actions`, validateAction, (req, res, next) => {
   Actions.insert(req.body)
      .then(action => {
         res.status(200).json(action)
      })
      .catch(next)
})

router.put(`/actions/:id`, validateActionId, validateAction, (req, res, next) => {
   Actions.update(req.params.id, req.body)
      .then(action => {
         res.status(200).json(action)
      })
      .catch(next)
})

router.delete(`/actions/:id`, validateActionId, (req, res, next) => {
   Actions.remove(req.params.id)
      .then(action => {
         res.status(200).json()
      })
      .catch(next)
})


module.exports = router