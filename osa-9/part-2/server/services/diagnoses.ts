import diagnosisData from '../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosisData as Array<DiagnosisEntry>;

const getEntries = (): Array<DiagnosisEntry> => diagnoses;

export default { getEntries };