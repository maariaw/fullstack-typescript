import { NewPatient, Gender } from './types';

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
};

const toNewPatient = (
    { name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };
    return newPatient;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isPast = (date: string): boolean => {
    // this function is used after determining that the string is a valid date
    const givenDate = new Date(date);
    const currentDate = new Date();
    return givenDate <= currentDate;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date) || !isPast(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isSsn = (ssn: string): boolean => {
    // Just very pimitive validation, there's libraries to do this properly
    const pattern = /\d{6}[-+A]\d{3}[\dA-Z]/;
    return pattern.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn) ) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Gender is missing or does not match options: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

export default toNewPatient;
