import express from 'express';
import controller from '../controller/TipoDocumento.js';

const router = express.Router();
const tipoDocumentoController = controller;

router.get('/', tipoDocumentoController.getAll);
router.get('/:id', tipoDocumentoController.getById);
router.post('/', tipoDocumentoController.create);
router.put('/:id', tipoDocumentoController.update);
router.delete('/:id', tipoDocumentoController.delete);

export default router;