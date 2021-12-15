import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Divider, Icon, SemanticICONS } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import { Patient, Gender, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';

const PatientInfoPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  const submitNewEntry = async (values: Entry) => {
    /*
     * TODO Don't submit empty sickLeave
     * TODO Error checking
     */

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient = {
        ...patients[id],
        entries: patients[id].entries.concat(newEntry)
      };
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch(e) {
      setError(e.response?.data?.error || 'Unkown error');
    }
  };

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
      <Divider hidden/>
      <Button onClick={() => openModal()}>Add new entry</Button>
      {patients[id].entries?.length > 0 && (
        <>
          <h4>entries</h4>
          {patients[id].entries.map(e => (
            <div key={e.id}>
              <div>{e.date} <i>{e.description}</i></div>
              <ul>
                {e.diagnosisCodes?.map(d => (
                  diagnoses[d] &&
                  <li key={d}>{d} {diagnoses[d].name} <i>{diagnoses[d].latin}</i></li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
    </div>
  );
  else return (
    <div>
      <h2>Invalid patient id</h2>
    </div>
  );
};

export default PatientInfoPage;