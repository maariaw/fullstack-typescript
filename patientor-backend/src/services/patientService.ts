import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NoSsnPatient, NewPatient } from '../types';

const getNoSsnPatients = (): NoSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getNoSsnPatients,
    addPatient
};
