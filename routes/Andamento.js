import express from 'express';
import controller from '../controller/Andamento.js';

const router = express.Router();
const andamentoController = controller;

router.get('/', andamentoController.getAll);
router.get('/:id', andamentoController.getById);
router.post('/', andamentoController.create);
router.put('/:id', andamentoController.update);
router.delete('/:id', andamentoController.delete);

export default router;