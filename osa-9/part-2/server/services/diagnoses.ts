import diagnosisData from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getEntries = (): Array<Diagnosis> => diagnoses;

export default { getEntries };