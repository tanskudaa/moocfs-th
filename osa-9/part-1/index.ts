import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, validExerciseArgs } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (
        !req.query.height ||
        !req.query.weight ||
        isNaN(Number(req.query.height)) ||
        isNaN(Number(req.query.weight))
    ) {
        res.json({ error: 'malformatted parameters' });
        return;
    }

    const args = {
        height: Number(req.query.height),
        weight: Number(req.query.weight),
    };

    res.json({
        ...args,
        bmi: calculateBmi({
            heightMeters: args.height/100,
            mass: args.weight
        })
    });
});

app.post('/exercises', (req, res) => {
    /*
     * This parameter validity check block is hugely shaky and could have holes
     */

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (
        !daily_exercises ||
        !target
    ) {
        res.json({ error: 'parameters missing' });
        return;
    }
    try {
        // eslint-disable-next-line
        if (daily_exercises.some((a: any) => isNaN(Number(a)))) throw new Error
        isNaN(Number(target));
    } catch {
        res.json({ error: 'malformatted parameters' });
        return;
    }

    const args: validExerciseArgs = {
        // eslint-disable-next-line
        workPerDay: daily_exercises.map((a: any) => Number(a)),
        target: Number(target)
    };
    res.json(calculateExercises(args));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
