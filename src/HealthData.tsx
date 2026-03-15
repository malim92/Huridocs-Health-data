import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios, { isCancel, AxiosError } from "axios";
import { config } from "../config";
import { PatientRecord } from './model/PatientRecord';

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Search from './components/Search';
import AddPatientForm from './components/AddPatientForm';
import getHealthData from './hooks/getHealthData';
import { usePatientTable } from './hooks/usePatientTable';
import DeletePatient from './components/DeletePatient';

export default function HealthData() {
  const [rows, setRows] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [ageSearch, setAgeSearch] = useState(0);


  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  const { filteredRows, visibleRows } = usePatientTable(
    rows,
    search,
    ageSearch,
    page,
    rowsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)',
        py: 7,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* ── Header ── */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            className='testclass'
            variant="h3"
            fontWeight={700}
            sx={{
              background: 'linear-gradient(90deg, #1565c0, #2e7d32)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Health Data
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Click the button to load data from the Health Categories API.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={getHealthData.bind(null, setLoading, setRows, setFetched, setError)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
            sx={{
              px: 5,
              py: 1.5,
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
            {loading ? 'Fetching…' : 'Fetch Health Data'}
          </Button>
        </Box>

        {/* ── Error ── */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            <strong>Failed to load data:</strong> {error}
          </Alert>
        )}

        {/* ── Empty state ── */}
        {fetched && !error && rows.length === 0 && (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No data returned from the API.
          </Alert>
        )}

        {/* ── Table ── */}
        {rows.length > 0 && (
          <Paper
            elevation={16}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              border: '3px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 32px rgba(32, 21, 184, 0.08)',
            }}
          >
            {/* Table header bar */}
            <Box
              sx={{
                px: 3,
                py: 2,
                background: 'linear-gradient(90deg, #1565c0, #0288d1)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="h6" fontWeight={600} color="white" sx={{ flexShrink: 0 }}>
                Results
              </Typography>
              {/* Search Input Fields */}
              <Search search={search} setSearch={setSearch} setPage={setPage} placeholder="Search by patient name, doctor, or condition..." />
              <Search search={ageSearch} setSearch={setAgeSearch} setPage={setPage} placeholder="Search by age..."/>
              <Chip
                label={`${filteredRows.length} record${filteredRows.length !== 1 ? 's' : ''}`}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, flexShrink: 0 }}
              />
            </Box>

            <TableContainer sx={{ maxHeight: 540 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col}
                        sx={{
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          bgcolor: '#f0f4f8',
                          color: '#1565c0',
                          borderBottom: '2px solid #90caf9',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col.replace(/_/g, ' ')}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map((row, i) => (
                    <TableRow
                      key={i}
                      hover
                      sx={{
                        '&:nth-of-type(even)': { bgcolor: '#f9fbff' },
                        '&:hover': { bgcolor: '#e3f2fd' },
                        transition: 'background 0.15s',
                      }}
                    >
                      {columns.map((col) => {
                        const val = row[col as keyof PatientRecord];
                        return (
                          <TableCell key={col}>
                            {val === null || val === undefined ? (
                              <Typography variant="caption" color="text.disabled">
                                —
                              </Typography>
                            ) : typeof val === 'boolean' ? (
                              <Chip
                                label={String(val)}
                                size="small"
                                color={val ? 'success' : 'default'}
                              />
                            ) : typeof val === 'object' ? (
                              JSON.stringify(row.patient)
                            ) : (
                              String(val)
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredRows.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
        )}

        <AddPatientForm />
        <DeletePatient />

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Link to="/thank-you" style={{ color: '#1565c0', fontSize: '0.875rem' }}>
            Thank You
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
