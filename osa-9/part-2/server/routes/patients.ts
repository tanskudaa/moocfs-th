import express from 'express';
import patientService from '../services/patients';
import { toNewPatientEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    /*
     * TODO Has no sensible response for error
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, ssn, dateOfBirth, gender, occupation } = req.body;
    const newEntry = patientService.addEntry(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        toNewPatientEntry({ name, ssn, dateOfBirth, gender, occupation })
    );

    res.json(newEntry);
});

export default router;