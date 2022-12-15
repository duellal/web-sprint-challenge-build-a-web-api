// add middlewares here related to actions
const Actions = require(`./actions-model`)
const Projects = require(`../projects/projects-model`)

async function validateActionId(req, res, next) {
   try {
      const { id } = req.params
      const action = await Actions.get(id)

      if (action) {
         req.action = action
         next()
      }
      else {
         next({
            status: 404,
            message: `action with id ${id} does not exist`
         })
      }
   }
   catch (err) {
      next(err)
   }
}

async function validateAction(req, res, next) {
   const { project_id, description, notes } = req.body

   const project_id_boolean = await Projects.get(project_id)

   if (project_id_boolean) {
      if (!project_id || !description || !notes) {
         next({
            status: 404,
            message: `Something is missing. You either forgot the project id, the description of the action, or the notes for the action`
         })
      }
      else {
         next()
      }
   }
   else {
      next({
         status: 404,
         message: `Project with id ${project_id} does not exist.`
      })
   }
}

async function validateProjectIdAction(req, res, next) {

}

module.exports = {
   validateActionId,
   validateAction
}