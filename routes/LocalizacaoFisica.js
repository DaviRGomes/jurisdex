import express from 'express';
import controller from '../controller/LocalizacaoFisica.js';

const router = express.Router();
const localizacaoFisicaController = controller;

router.get('/', localizacaoFisicaController.getAll);
router.get('/:id', localizacaoFisicaController.getById);
router.post('/', localizacaoFisicaController.create);
router.put('/:id', localizacaoFisicaController.update);
router.delete('/:id', localizacaoFisicaController.delete);

export default router;