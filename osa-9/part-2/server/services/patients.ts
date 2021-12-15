import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, Patient, Entry } from '../types';
import { toNewPatient } from '../utils';

const patients: Patient[] = patientData.map(a => (
    {
        id: uuid(), // ID's in JSON are now discarded
        ...toNewPatient(a)
    }
));


const removeSensitivePatientFields = (p: Patient): NonSensitivePatient => {
    const { id, name, dateOfBirth, gender, occupation } = p;
    return { id, name, dateOfBirth, gender, occupation };
};

// Ambiguously named, since patinets have entries-field
const getPatients = (): Array<Patient> => patients;

const getPatientsNonSensitive = (): NonSensitivePatient[] => {
    return patients.map((a: Patient) => removeSensitivePatientFields(a));
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (patient: Omit<Patient, 'id'>): NonSensitivePatient => {
    const newEntry = { ...patient, id: uuid() };
    patients.push(newEntry);
    return removeSensitivePatientFields(newEntry);
};

const addEntryToPatient = (id: string, entry: Entry): Entry => {
    /*
     * TODO not tested
     */
    const patient = getPatientById(id);
    if (patient) {
        patient.entries.push(entry);
        return entry;
    } else {
        throw new Error('invalid id');
    }
};


export default {
    getPatients,
    getPatientById,
    getPatientsNonSensitive,
    addPatient,
    addEntryToPatient
};