import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import postPatient from '../hooks/postPatient';

type FormValues = {
  patient: string;
  age: string;
  condition: string;
  doctor: string;
  appointment: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const empty: FormValues = {
  patient: '',
  age: '',
  condition: '',
  doctor: '',
  appointment: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.patient.trim()) errors.patient = 'Patient name is required.';
  const age = Number(values.age);
  if (!values.age) errors.age = 'Age is required.';
  else if (!Number.isInteger(age) || age < 0 || age > 150)
    errors.age = 'Age must be a whole number between 0 and 150.';
  if (!values.condition.trim()) errors.condition = 'Condition is required.';
  if (!values.doctor.trim()) errors.doctor = 'Doctor name is required.';
  if (!values.appointment) errors.appointment = 'Appointment date is required.';
  return errors;
}

export default function AddPatientForm() {
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(empty) as (keyof FormValues)[]).map((k) => [k, true])
    ) as Record<keyof FormValues, boolean>;
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    await postPatient(
      {
        patient: values.patient.trim(),
        age: Number(values.age),
        condition: values.condition.trim(),
        doctor: values.doctor.trim(),
        appointment: values.appointment,
      },
      setSubmitting,
      setSuccess,
      setServerError
    );

    if (!serverError) setValues(empty);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          background: 'linear-gradient(90deg, #2e7d32, #43a047)',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="white">
          Add Patient Record
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
          Fill in all fields and submit to create a new record.
        </Typography>
      </Box>

      {/* Form body */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Patient Name"
              fullWidth
              value={values.patient}
              onChange={set('patient')}
              onBlur={blur('patient')}
              error={!!errors.patient}
              helperText={errors.patient}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Age"
              type="number"
              fullWidth
              value={values.age}
              onChange={set('age')}
              onBlur={blur('age')}
              error={!!errors.age}
              helperText={errors.age}
              slotProps={{ htmlInput: { min: 0, max: 150 } }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Condition"
              fullWidth
              value={values.condition}
              onChange={set('condition')}
              onBlur={blur('condition')}
              error={!!errors.condition}
              helperText={errors.condition}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Doctor"
              fullWidth
              value={values.doctor}
              onChange={set('doctor')}
              onBlur={blur('doctor')}
              error={!!errors.doctor}
              helperText={errors.doctor}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Appointment Date"
              type="date"
              fullWidth
              value={values.appointment}
              onChange={set('appointment')}
              onBlur={blur('appointment')}
              error={!!errors.appointment}
              helperText={errors.appointment}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
        </Grid>

        {/* Feedback */}
        {success && (
          <Alert severity="success" sx={{ mt: 2.5, borderRadius: 2 }}>
            Patient record submitted successfully.
          </Alert>
        )}
        {serverError && (
          <Alert severity="error" sx={{ mt: 2.5, borderRadius: 2 }}>
            {serverError}
          </Alert>
        )}

        {/* Submit */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : undefined}
            sx={{
              px: 5,
              py: 1.25,
              borderRadius: 2.5,
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(90deg, #2e7d32, #43a047)',
              boxShadow: '0 4px 14px rgba(46,125,50,0.35)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1b5e20, #388e3c)',
                boxShadow: '0 6px 18px rgba(46,125,50,0.5)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {submitting ? 'Submitting…' : 'Submit Record'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
