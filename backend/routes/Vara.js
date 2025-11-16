import express from 'express';
import controller from '../controller/Vara.js';

const router = express.Router();
const varaController = controller;

router.get('/', varaController.getAll);
router.get('/:id', varaController.getById);
router.post('/', varaController.create);
router.put('/:id', varaController.update);
router.delete('/:id', varaController.delete);

export default router;