import express from 'express';
import controller from '../controller/Processo.js';

const router = express.Router();
const processoController = controller;

router.get('/', processoController.getAll);
router.get('/:id', processoController.getById);
router.post('/', processoController.create);
router.put('/:id', processoController.update);
router.delete('/:id', processoController.delete);

export default router;