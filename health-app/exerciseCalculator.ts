interface Input {
    hours: Array<number>;
    target: number;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseInput = (args: Array<string>): Input => {
    if (args.length < 4 ) throw new Error('Not enough arguments.');
    const numberMapper = (arg: string): number => {
        return Number(arg);
    }
    const nanFilter = (value: number, index: number): boolean => {
        return !isNaN(value) || index < 2;
    }
    const validNumbers = args.map(numberMapper).filter(nanFilter);
    if (validNumbers.length == args.length &&
            validNumbers[2] > 0) {
        return {
            hours: validNumbers.slice(3),
            target: validNumbers[2]
        }
    } else if (validNumbers.length !== args.length) {
        throw new Error('Provided values were not all numbers');
    } else {
        throw new Error('Target must be more than zero');
    }
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const trainingDays = hours.filter(exercise => exercise > 0);
    const sum = hours.reduce((total, hour) => total + hour, 0);
    const average = sum / hours.length;
    let rating;
    let ratingText;
    if (average / target < 0.6) {
        rating = 1;
        ratingText = 'You\'ll have to put more effort in';
    } else if (average / target < 1) {
        rating = 2;
        ratingText = 'You\'re getting there';
    } else {
        rating = 3;
        ratingText = 'You did it, great job!';
    }
    return {
        periodLength: hours.length,
        trainingDays: trainingDays.length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingText,
        target: target,
        average: average
    }
}

try {
    const { hours, target } = parseInput(process.argv);
    const result = calculateExercises(hours, target);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
