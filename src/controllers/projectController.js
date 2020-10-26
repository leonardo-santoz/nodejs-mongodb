const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware)

router.get('/', async (request, response) => {
    try {
        const projects = await Project.find().populate(['user', 'tasks']);

        return response.send(projects);
    } catch (error) {
        return response.status(400).send({ error: 'Error to loading projects' })
    }
});

router.get('/:projectId', async (request, response) => {
    try {
        const { projectId } = request.params;

        const project = await Project.findById(projectId)
            .populate(['user', 'tasks']);

        return response.send(project);
    } catch (error) {
        return response.status(400).send({ error: 'Error to loading project' })
    }
});

router.post('/', async (request, response) => {
    try {
        const { title, description, tasks } = request.body;

        const project = await Project.create({
            title,
            description,
            user: request.userId
        });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return response.send(project);
    } catch (error) {
        return response.status(400).send({ error: 'Error to creating a new project' })
    }
});

router.put('/:projectId', async (request, response) => {
    try {
        const { projectId } = request.params;

        const { title, description, tasks } = request.body;

        const project = await Project.findByIdAndUpdate(
            projectId,
            {
                title,
                description,
            }, { new: true });

        project.tasks = [];
        await Task.deleteOne({ project: project._id })

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return response.send({ project });
    } catch (error) {
        return response.status(400).send({ error: 'Error to updating project' })
    }
});

router.delete('/:projectId', async (request, response) => {
    try {
        const { projectId } = request.params;

        await Project.findByIdAndRemove(projectId);

        return response.status(200).send();
    } catch (error) {
        return response.status(400).send({ error: 'Error to deleting a project' })
    }
});

module.exports = app => app.use('/projects', router); 