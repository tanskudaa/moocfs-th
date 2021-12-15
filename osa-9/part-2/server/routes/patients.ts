/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientService from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPatientsNonSensitive());
});

router.get('/:id', (req, res) => {
    const result = patientService.getPatientById(req.params.id);

    res.json(result
        ? result
        : { error: 'invalid id' }
    );
});

router.post('/', (req, res) => {
    /*
     * TODO Has no sensible response for error
     */
    const newEntry = patientService.addPatient(toNewPatient(req.body));
    res.json(newEntry);
});

router.post('/:id/entries', (req, res) => {
    const newEntry = patientService.addEntryToPatient(
        req.params.id,
        toNewEntry(req.body)
    );
    res.json(newEntry);
});

export default router;