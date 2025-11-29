import express from 'express';
import multer from 'multer';
import controller from '../controller/Documento.js';

const router = express.Router();
const documentoController = controller;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', documentoController.getAll);
router.get('/:id', documentoController.getById);
router.get('/nome/:nome', documentoController.getByName);
router.post('/', documentoController.create);
router.post('/upload', upload.single('file'), documentoController.upload);
router.put('/:id', documentoController.update);
router.delete('/:id', documentoController.delete);

export default router;
