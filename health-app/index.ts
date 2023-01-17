import express from 'express';
import { ParsedQs } from 'qs';
import { calculateBmi, BodyDimensions } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const parseFromQuery = (query: ParsedQs): BodyDimensions => {
        if (!isNaN(Number(query.height)) && !isNaN(Number(query.weight))) {
            return {
                height: Number(query.height),
                weight: Number(query.weight)
            }
        } else {
            throw new Error('malformatted parameters');
        }
    }
    try {
        const {height, weight} = parseFromQuery(req.query);
        const result = calculateBmi(height, weight);
        res.status(200).json({ ...req.query, bmi: result });
    } catch (error: unknown) {
        if (error instanceof Error) res.status(422).json({ error: error.message });
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});
