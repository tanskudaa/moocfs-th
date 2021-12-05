import React from 'react';
import { Divider, Icon, SemanticICONS } from 'semantic-ui-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';

const PatientInfoPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const getGenderIcon = (g: Gender): SemanticICONS | undefined => {
    switch (g) {
      case (Gender.Male): return "mars";
      case (Gender.Female): return "venus";
      case (Gender.Other): return "genderless";
      default: return undefined;
    }
  };

  const fetchPatientInfo = async () => {
    if (Object.keys(patients).length === 0) return;
    if (!patients[id] || !patients[id].ssn) {
      try {
        const { data: patient } = await axios.get<Patient | undefined>(
          `${apiBaseUrl}/patients/${id}`
        );

        if (patient) dispatch(updatePatient(patient));
      }
      catch (e) {
        console.error(e);
      }
    }
  };

  React.useEffect(() => {
    void fetchPatientInfo();
  }, [id, patients]);

  if (patients[id]) return (
    <div>
      <h2>{patients[id].name} <Icon name={getGenderIcon(patients[id].gender)}/></h2>
      <div>ssn: {patients[id].ssn}</div>
      <div>occupation: {patients[id].occupation}</div>
      <div>date of birth: {patients[id].dateOfBirth}</div>
      {patients[id].entries?.length > 0 && (
        <>
          <Divider hidden/>
          <h4>entries</h4>
          {patients[id].entries.map(e => (
            <div key={e.id}>
              <div>{e.date} <i>{e.description}</i></div>
              <ul>
                {e.diagnosisCodes?.map(d => (
                  <li key={d}>{d} {diagnoses[d].name} <i>{diagnoses[d].latin}</i></li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
  else return (
    <div>
      <h2>Invalid patient id</h2>
    </div>
  );
};

export default PatientInfoPage;