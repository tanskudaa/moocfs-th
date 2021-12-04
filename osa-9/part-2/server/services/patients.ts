import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, PatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';

const patients: PatientEntry[] = patientData.map(a => (
    {
        /*
         * ID's in JSON are now discarded
         */
        id: uuid(),
        ...toNewPatientEntry(a)
    }
));


const removeSensitiveInfo = (p: PatientEntry): NonSensitivePatientEntry => {
    const { id, name, dateOfBirth, gender, occupation } = p;
    return { id, name, dateOfBirth, gender, occupation };
};

const getEntries = (): Array<PatientEntry> => patients;

const getEntryById = (id: string): PatientEntry | undefined => {
    return patients.find(p => p.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map((a: PatientEntry) => removeSensitiveInfo(a));
};

const addEntry = (params: Omit<PatientEntry, 'id'>): NonSensitivePatientEntry => {
    const newEntry = { ...params, id: uuid() };
    patients.push(newEntry);
    return removeSensitiveInfo(newEntry);
};


export default { getEntries, getEntryById, getNonSensitiveEntries, addEntry };