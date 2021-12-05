import { Entry, Gender, Patient } from './types';

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown,
    entries: unknown
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) throw new Error('Entries not an array');

  entries.forEach(e => {
    /*
     * This feels dirty, but I can't think of a way to get these values
     * programmaticaly from ./types.ts
     * 
     * They could be assigned to enum in types but that doesn't seem any cleaner
     */
    if (![
        "Hospital",
        "OccupationalHealthcare",
        "HealthCheck"
      ].includes((e as Entry).type)) throw new Error('Incorrect type of entry');
  });

  return entries.map(e => e as Entry);
};

const toNewPatientEntry = 
  ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): Omit<Patient, 'id'> => {
    const newEntry = {
      name: parseName(name),
      dateOfBirth: parseDateOfBirth(dateOfBirth),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: parseEntries(entries)
    };

    return newEntry;
  };

export { isString, isGender, toNewPatientEntry };