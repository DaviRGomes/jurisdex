import express from 'express';
import documentoRouter from './routes/Documento.js';

const app = express(); 
const PORT = process.env.PORT || 3000;  

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/documento', documentoRouter);


