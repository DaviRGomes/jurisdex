import express from 'express';
import controller from '../controller/Pessoa.js';

const router = express.Router();
const pessoaController = controller;

router.get('/', pessoaController.getAll);
router.get('/:id', pessoaController.getById);
router.get('/:id/partes', pessoaController.getPartesByPessoaId);
router.post('/:id/partes', pessoaController.createParteForPessoa);
router.post('/', pessoaController.create);
router.put('/:id', pessoaController.update);
router.delete('/:id', pessoaController.delete);

export default router;