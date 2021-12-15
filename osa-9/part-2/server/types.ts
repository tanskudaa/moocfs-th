export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy",
  "LowRisk",
  "HighRisk",
  "Critical"
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string,
  type: EntryType,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital,
  discharge: {
    date: string,
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare,
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck,
  healthCheckRating: HealthCheckRating
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;