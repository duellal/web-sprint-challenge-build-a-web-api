// add middlewares here related to projects
const Projects = require(`./projects-model`)

async function validateProjectId(req, res, next) {
   try {
      const { id } = req.params
      const project = await Projects.get(id)

      if (project) {
         req.project = project
         next()
      }
      else {
         next({
            status: 404,
            message: `project with id ${id} does not exist`
         })
      }
   }
   catch (err) {
      next(err)
   }
}

async function validateProjects(req, res, next) {
   const { name, description } = req.body

   if (!name || !description) {
      next({
         status: 400,
         message: `Something is missing. You either forgot the name or the description.`
      })
   }
   else {
      next()
   }
}

module.exports = {
   validateProjectId,
   validateProjects,

}
