import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
const app = express();

app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('There was a ping');
    res.send('pong!');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
