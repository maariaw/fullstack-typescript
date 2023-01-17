export interface BodyDimensions {
    height: number;
    weight: number;
}

const parseBodyDimensions = (args: Array<string>): BodyDimensions => {
    if (args.length < 4 ) {
        throw new Error('Provide both height and weight as arguments');
    }
    if (args.length > 4 ) {
        throw new Error('Provide only height and weight as arguments');
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    height = height / 100;
    const square = height * height;
    const bmi =  weight / square;

    if (bmi < 16) {
        return 'Underweight (severe thinness)';
    } else if (bmi < 17) {
        return 'Underweight (moderate thinness)';
    } else if (bmi < 18.5) {
        return 'Underweight (mild thinness)';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight (pre-obese)';
    } else if (bmi < 35) {
        return 'Obese (class I)';
    } else if (bmi < 40) {
        return 'Obese (class II)';
    } else {
        return 'Obese (class III)';
    }
}

try {
    const { height, weight } = parseBodyDimensions(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad occurred.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
