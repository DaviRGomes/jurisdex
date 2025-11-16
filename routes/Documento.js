import express from 'express';
import controller from '../controller/Documento.js';

const router = express.Router();
const documentoController = controller;

router.get('/', documentoController.getAll);
router.get('/:id', documentoController.getById);
router.get('/nome/:nome', documentoController.getByName);
router.post('/', documentoController.create);
router.put('/:id', documentoController.update);
router.delete('/:id', documentoController.delete);

export default router;
