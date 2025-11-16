import express from 'express';
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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.use('/documento', documentoRouter);
app.use('/usuario', usuarioRouter);
app.use('/pessoa', pessoaRouter);
app.use('/processo', processoRouter);
app.use('/tipo-documento', tipoDocumentoRouter);
app.use('/andamento', andamentoRouter);
app.use('/audiencia', audienciaRouter);
app.use('/localizacao-fisica', localizacaoFisicaRouter);
app.use('/vara', varaRouter);
app.use('/parte', parteRouter);


