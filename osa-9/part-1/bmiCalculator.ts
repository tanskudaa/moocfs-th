export interface validBmiArgs {
    heightMeters: number,
    mass: number
}

const validateBmiArgs = (args: Array<string>): validBmiArgs => {
    // 1st and 2nd arguments are ts-node and this script paths respectively
    if (args.length !== 4) throw new Error('Expected 2 arguments');

    const strippedArgs = args.slice(2);

    strippedArgs.forEach(a => {
        const num = Number(a);
        if (isNaN(num)) throw new Error(`Expected valid number, got '${a}'`);
        if (num <= 0) throw new Error(`Expected positive number, got '${a}'`);
    });

    const heightCentimeters = Number(strippedArgs[0]);
    const mass = Number(strippedArgs[1]);

    return {
        heightMeters: heightCentimeters/100,
        mass
    };
};

export const calculateBmi = (args: validBmiArgs): string => {
    const bmiNum: number = args.mass/(args.heightMeters*args.heightMeters);

    /*
     * Programmers waste enormous amounts of time thinking about, or worrying
     * about, the speed of noncritical parts of their programs, and these
     * attempts at efficiency actually have a strong negative impact when
     * debugging and maintenance are considered. We should forget about small
     * efficiencies, say about 97% of the time: premature optimization is the
     * root of all evil.
     *  - Donald Knuth
     */

    const bmiString:string = (
          (bmiNum > 40.0) ? 'Obese (Class III)'
        : (bmiNum > 35.0) ? 'Obese (Class II)'
        : (bmiNum > 30.0) ? 'Obese (Class I)'
        : (bmiNum > 25.0) ? 'Overweight'
        : (bmiNum > 18.5) ? 'Normal range'
        : (bmiNum > 17.0) ? 'Underweight (Mild thinness)'
        : (bmiNum > 16.0) ? 'Underweight (Moderate thinness)'
        :                   'Underweight (Severe thinness)'
    );

    return bmiString;
};

try {
    const args = validateBmiArgs(process.argv);
    console.log(calculateBmi(args));
}
catch (error) {
    console.log('Raised exception');
    if (error instanceof Error) console.log(error.message);
}