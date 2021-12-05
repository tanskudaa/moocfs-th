import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, Patient } from '../types';
import { toNewPatientEntry } from '../utils';

const patients: Patient[] = patientData.map(a => (
    {
        // ID's in JSON are now discarded
        id: uuid(),
        ...toNewPatientEntry(a)
    }
));


const removeSensitiveInfo = (p: Patient): NonSensitivePatientEntry => {
    const { id, name, dateOfBirth, gender, occupation } = p;
    return { id, name, dateOfBirth, gender, occupation };
};

const getEntries = (): Array<Patient> => patients;

const getEntryById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map((a: Patient) => removeSensitiveInfo(a));
};

const addEntry = (params: Omit<Patient, 'id'>): NonSensitivePatientEntry => {
    const newEntry = { ...params, id: uuid() };
    patients.push(newEntry);
    return removeSensitiveInfo(newEntry);
};


export default { getEntries, getEntryById, getNonSensitiveEntries, addEntry };