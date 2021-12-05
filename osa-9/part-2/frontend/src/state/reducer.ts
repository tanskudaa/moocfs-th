import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export const setPatientList = (list: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: list
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient
  };
};

export const setDiagnoses = (list: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: list
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients // ???? Concatenates ????
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const patientToUpdate = state.patients[action.payload.id];
      if (!patientToUpdate) return state;
      else return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          )
        }
      };
    default:
      return state;
  }
};
