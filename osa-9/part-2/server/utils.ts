import { Gender, PatientEntry } from './types';

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown,
    /*
     * TODO
     */
    // entries: unknown
};

const isString = (param: unknown): param is string => {
    return typeof param === 'string' || param instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    /*
     * Passes but gives a linter warning???
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) throw new Error('Incorrect or missing name');
    else return String(name);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    return parseName(dateOfBirth);
};

const parseSsn = (ssn: unknown): string => {
    return parseName(ssn);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) throw new Error('Incorrect or missing gender');
    else return gender;
};

const parseOccupation = (occupation: unknown): string => {
    return parseName(occupation);
};

const toNewPatientEntry = 
    ({ name, dateOfBirth, ssn, gender, occupation }: Fields): Omit<PatientEntry, 'id'> => {
        const newEntry = {
            name: parseName(name),
            dateOfBirth: parseDateOfBirth(dateOfBirth),
            ssn: parseSsn(ssn),
            gender: parseGender(gender),
            occupation: parseOccupation(occupation),
            /*
             * TODO
             */
            entries: []
        };

        return newEntry;
    };

export { isString, isGender, toNewPatientEntry };