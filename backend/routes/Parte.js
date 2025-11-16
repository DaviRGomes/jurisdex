import express from 'express';
import controller from '../controller/Parte.js';

const router = express.Router();
const parteController = controller;

router.get('/', parteController.getAll);
router.get('/:id', parteController.getById);
router.post('/', parteController.create);
router.put('/:id', parteController.update);
router.delete('/:id', parteController.delete);

export default router;