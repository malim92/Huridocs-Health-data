import axios, { AxiosError } from 'axios';
import { config } from '../../config';
import { PatientRecord } from '../model/PatientRecord';


export default async function postPatient(
  Id: string,
  setSubmitting: (v: boolean) => void,
  setSuccess: (v: boolean) => void,
  setError: (v: string | null) => void
): Promise<void> {
  setSubmitting(true);
  setError(null);
  setSuccess(false);
  try {
    await axios.delete(`${config.API_URL}/${Id}`);
    setSuccess(true);
  } catch (err) {
    setError(err instanceof AxiosError ? err.message : String(err));
  } finally {
    setSubmitting(false);
  }
}
