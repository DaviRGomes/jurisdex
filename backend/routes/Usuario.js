import express from 'express';
import controller from '../controller/Usuario.js';

const router = express.Router();
const usuarioController = controller;

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);

export default router;