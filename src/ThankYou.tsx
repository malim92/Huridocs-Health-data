import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography fontSize={72} lineHeight={1} mb={2}>🎉</Typography>

      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          background: 'linear-gradient(90deg, #1565c0, #2e7d32)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        Thank You!
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420, mb: 4 }}>
        Developed By Ali Almazawi for Huridocs.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/health-data')}
          sx={{
            px: 4,
            py: 1.25,
            borderRadius: 2.5,
            fontWeight: 600,
            textTransform: 'none',
            background: 'linear-gradient(90deg, #1565c0, #0288d1)',
            boxShadow: '0 4px 14px rgba(21,101,192,0.35)',
            '&:hover': {
              background: 'linear-gradient(90deg, #0d47a1, #01579b)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Back to Health Data
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.25,
            borderRadius: 2.5,
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}
