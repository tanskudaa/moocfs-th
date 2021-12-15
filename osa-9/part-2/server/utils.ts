/* eslint-disable @typescript-eslint/no-unsafe-argument */

/*
 *
 * This code file made me hate REST, and almost hate TypeScript.
 * 
 */

import { v1 as uuid } from 'uuid';
import { Entry, EntryType, Gender, HealthCheckRating, Patient } from './types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isValidEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const isValidRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(param));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error('Incorrect or missing name');
  else return String(name);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  } else {
    return String(dateOfBirth);
  }
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  } else {
    return String(ssn);
  }
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) throw new Error('Incorrect or missing gender');
  else return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  } else {
    return String(occupation);
  }
};

const parseEntries = (entries: unknown): Entry[] => {
  /*
   * TODO Shaky and incomplete check that accepts anything with correct type
  * -field.
   */
  if (!entries || !Array.isArray(entries)) throw new Error('Entries not an array');
  entries.forEach(e => parseEntryType(e.type));

  return entries.map(e => e as Entry);
};

const parseEntryType = (t: unknown): EntryType => {
  if (!t || !isValidEntryType(t)) {
    throw new Error('Incorrect entry type');
  } else {
    return t;
  }
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing description');
  } else {
    return String(desc);
  }
};

const parseSpecialist = (spec: unknown): string => {
  if (!spec || !isString(spec)) {
    throw new Error('Incorrect or missing description');
  } else {
    return String(spec);
  }
};

const parseDischarge = (object: any): { date: string, criteria: string} => {
  if (
    !object.date
    || !isString(object.date)
    || !object.criteria
    || !isString(object.criteria)
  ) {
    throw new Error('Incorrect or missing description');
  } else {
    return {
      date: String(object.date),
      criteria: String(object.criteria)
    };
  }
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isValidRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  } else {
    return rating;
  }
};

const toNewPatient = (object: any): Omit<Patient, 'id'> => {
  const newEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };

  return newEntry;
};

const toNewEntry = (object: any): Entry => {
  const id = uuid();
  const type = parseEntryType(object.type);
  const description = parseDescription(object.description);
  const date = parseDateOfBirth(object.date); // TODO date of birth parser used
  const specialist = parseSpecialist(object.specialist);
  const diagnosisCodes = <string[]>object.diagnosisCodes; // optional not checked

  switch (type) {
    case EntryType.Hospital:
      const discharge = parseDischarge(object.discharge);

      return {
        id,
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge
      };
    case EntryType.OccupationalHealthcare:
      const employerName = parseName(object.employerName);
      const sickLeave = { // optional not checked
        startDate: String(object.sickLeave.startDate),
        endDate: String(object.sickLeave.endDate)
      };

      return {
        id,
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave
      };
    case EntryType.HealthCheck:
      const healthCheckRating = parseHealthCheckRating(object.healthCheckRating);

      return {
        id,
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating
      };
    default:
      throw new Error('Incorrect type of entry');
  }
};

export { isString, isGender, toNewPatient, toNewEntry };