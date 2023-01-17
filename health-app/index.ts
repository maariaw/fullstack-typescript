import express from 'express';
import { ParsedQs } from 'qs';
import { calculateBmi, BodyDimensions } from './bmiCalculator';
import { calculateExercises, Input } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const parseFromQuery = (query: ParsedQs): BodyDimensions => {
        if (!isNaN(Number(query.height)) && !isNaN(Number(query.weight))) {
            return {
                height: Number(query.height),
                weight: Number(query.weight)
            };
        } else {
            throw new Error('malformatted parameters');
        }
    };
    try {
        const {height, weight} = parseFromQuery(req.query);
        const result = calculateBmi(height, weight);
        res.status(200).json({ ...req.query, bmi: result });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(422).json({ error: error.message });
        }
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateParameters = (body: any): Input => {
        if (body.daily_exercises == undefined || body.target == undefined) {
            throw new Error('parameters missing');
        }

        const validHours = [...body.daily_exercises]
            .map((n) => Number(n))
            .filter((n) => !isNaN(n));
        if (validHours.length < body.daily_exercises.length ||
            validHours.length < 1 ||
            isNaN(Number(body.target)) ||
            Number(body.target) < 1) {
            console.log(validHours.length, validHours);
            throw new Error('malformatted parameters');
        }
        return {
            hours: validHours,
            target: Number(body.target)
        };
    };

    try {
        const { hours, target } = validateParameters(req.body);
        const result = calculateExercises(hours, target);
        res.status(200).json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(422).json({ error: error.message });
        }
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});
