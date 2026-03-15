import axios, { AxiosError } from 'axios';
import { config } from '../../config';
import { PatientRecord } from '../model/PatientRecord';

export default async function getHealthData(
  setLoading: (value: boolean) => void,
  setRows: (rows: PatientRecord[]) => void,
  setFetched: (value: boolean) => void,
  setError: (message: string) => void
): Promise<PatientRecord[]> {
    setLoading(true);
    try {
      const response = await axios.get<PatientRecord[]>(config.API_URL);
      const data = response.data;

      console.log(data, "test data response");

      setRows(data);
      setFetched(true);
      setLoading(false);

      return data;
    } catch (error) {
      console.error(error);
      setError(error instanceof AxiosError ? error.message : String(error));
      setLoading(false);
      return [];
    }
  }