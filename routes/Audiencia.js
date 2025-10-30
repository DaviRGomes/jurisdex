import express from 'express';
import controller from '../controller/Audiencia.js';

const router = express.Router();
const audienciaController = controller;

router.get('/', audienciaController.getAll);
router.get('/:id', audienciaController.getById);
router.post('/', audienciaController.create);
router.put('/:id', audienciaController.update);
router.delete('/:id', audienciaController.delete);

export default router;