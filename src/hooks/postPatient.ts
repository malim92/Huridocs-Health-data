import axios, { AxiosError } from 'axios';
import { config } from '../../config';
import { PatientRecord } from '../model/PatientRecord';

type NewPatient = Omit<PatientRecord, 'id'>;

export default async function postPatient(
  patient: NewPatient,
  setSubmitting: (v: boolean) => void,
  setSuccess: (v: boolean) => void,
  setError: (v: string | null) => void
): Promise<void> {
  setSubmitting(true);
  setError(null);
  setSuccess(false);
  try {
    await axios.post(config.API_URL, patient);
    setSuccess(true);
  } catch (err) {
    setError(err instanceof AxiosError ? err.message : String(err));
  } finally {
    setSubmitting(false);
  }
}
