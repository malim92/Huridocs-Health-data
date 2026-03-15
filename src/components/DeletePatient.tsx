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
import { useState } from 'react';
import deletePatient from '../hooks/deletePatient';

type FormValues = {
    id: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const empty: FormValues = {
    id: ''
};


export default function DeletePatient() {

    const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
    const [values, setValues] = useState<FormValues>(empty);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    function validate(values: FormValues): FormErrors {
        const errors: FormErrors = {};
        if (!values.id.trim()) errors.id = 'Patient ID is required.';
        return errors;
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched = Object.fromEntries(
            (Object.keys(empty) as (keyof FormValues)[]).map((k) => [k, true])
        ) as Record<keyof FormValues, boolean>;
        setTouched(allTouched);
        const errs = validate(values);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        await deletePatient(
            values.id.trim(),
            setSubmitting,
            setSuccess,
            setServerError
        );
    }
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
                    background: 'linear-gradient(90deg, #d60404, #db4d3a)',
                }}
            >
                <Typography variant="h6" fontWeight={600} color="white">
                    Delete Patient By Id
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                    Fill in the patient ID and submit to delete the record.
                </Typography>
            </Box>

            {/* Form body */}
            <Box component="form" onSubmit={handleDelete} noValidate sx={{ p: 3 }}>
                <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Patient Id"
                            fullWidth
                            value={values.id}
                            onChange={(e) => setValues({ ...values, id: e.target.value })}
                            // onBlur={blur('id')}
                            error={!!errors.id}
                            helperText={errors.id}
                        />
                    </Grid>
                </Grid>

                {/* Feedback */}
                {success && (
                    <Alert severity="success" sx={{ mt: 2.5, borderRadius: 2 }}>
                        Patient record delted successfully.
                    </Alert>
                )}
                {serverError && (
                    <Alert severity="error" sx={{ mt: 2.5, borderRadius: 2 }}>
                        {serverError}
                    </Alert>
                )}

                {/* Delete */}
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
                        {submitting ? 'Deleting…' : 'Delete Record'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}