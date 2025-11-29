import express from 'express';
import dotenv from 'dotenv';
import documentoRouter from './routes/Documento.js';
import usuarioRouter from './routes/Usuario.js';
import pessoaRouter from './routes/Pessoa.js';
import processoRouter from './routes/Processo.js';
import tipoDocumentoRouter from './routes/TipoDocumento.js';
import andamentoRouter from './routes/Andamento.js';
import audienciaRouter from './routes/Audiencia.js';
import localizacaoFisicaRouter from './routes/LocalizacaoFisica.js';
import varaRouter from './routes/Vara.js';
import parteRouter from './routes/Parte.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  const allowedOrigins = String(process.env.CORS_ORIGIN || 'http://localhost:3001')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
  } else {
    res.header('Access-Control-Allow-Origin', allowedOrigins[0] || '*');
  }
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jurindex API',
      version: '1.0.0',
      description: 'Documentação da API do Jurindex',
    },
  },
  apis: ['./routes/*.js'], // ajuste se quiser gerar a partir de JSDoc nas rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/usuario', usuarioRouter);
app.use('/documento', authMiddleware, documentoRouter);
app.use('/pessoa', authMiddleware, pessoaRouter);
app.use('/processo', authMiddleware, processoRouter);
app.use('/tipo-documento', authMiddleware, tipoDocumentoRouter);
app.use('/andamento', authMiddleware, andamentoRouter);
app.use('/audiencia', authMiddleware, audienciaRouter);
app.use('/localizacao-fisica', authMiddleware, localizacaoFisicaRouter);
app.use('/vara', authMiddleware, varaRouter);
app.use('/parte', authMiddleware, parteRouter);


