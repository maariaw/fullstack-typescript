interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
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
    const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
