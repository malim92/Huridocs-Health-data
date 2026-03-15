import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            background: 'linear-gradient(90deg, #1565c0, #2e7d32)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Welcome
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Huridocs Health Portal
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Application project for software developer role at Huridocs by Ali Almazawi.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/health-data')}
          sx={{
            px: 6,
            py: 1.75,
            borderRadius: 3,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            background: 'linear-gradient(90deg, #1565c0, #0288d1)',
            boxShadow: '0 4px 15px rgba(21,101,192,0.35)',
            '&:hover': {
              background: 'linear-gradient(90deg, #0d47a1, #01579b)',
              boxShadow: '0 6px 20px rgba(21,101,192,0.5)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          View Health Data
        </Button>
      </Container>
    </Box>
  );
}
