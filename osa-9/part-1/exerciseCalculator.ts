interface stats {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number
    success: boolean,
    rating: number,
    ratingDescription: string,
}

interface validExerciseArgs {
    workPerDay: Array<number>,
    target: number
}


const validateExerciseArgs = (args: Array<string>): validExerciseArgs => {
    // 1st and 2nd arguments are ts-node and this script paths respectively
    if (args.length < 4) throw new Error('Expected 2 or more arguments')

    const strippedArgs = args.slice(2)

    strippedArgs.forEach(a => {
        const num = Number(a)
        if (isNaN(num)) throw new Error(`Expected valid number, got '${a}'`)
        if (num < 0) throw new Error(`Expected non-negative number, got '${a}'`)
    })

    const target = Number(strippedArgs[0])
    const workPerDay = strippedArgs.slice(1).map(a => Number(a))

    return {
        workPerDay,
        target
    }
}

const clamp = (value: number, low: number, hi: number) => (
    Math.max(low, Math.min(hi, value))
)

const calculateExercises = (args: validExerciseArgs): stats => {
    enum Grades {
        Fail,
        Pass,
        Average,
        Exemplary
    }

    const total = args.workPerDay.reduce((acc, curr) => acc + curr)
    const average = total/args.workPerDay.length
    const rating = clamp(
        Math.floor((Math.min(args.target * 3, average)/args.target)),
        0, 3
    )

    return {
        periodLength: args.workPerDay.length,
        trainingDays: args.workPerDay.filter(a => a !== 0).length,
        target: args.target,
        average,
        success: args.target <= average,
        rating,
        ratingDescription: Grades[rating]
    }
}


try {
    const args = validateExerciseArgs(process.argv)
    console.log(calculateExercises(args))
}
catch (error) {
    console.log(error.message)
}
