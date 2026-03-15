import { InputAdornment, TextField } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type SearchProps<T> = {
  search: T;
  setSearch: Dispatch<SetStateAction<T>>;
  setPage: (value: number) => void;
  placeholder?: string;
};

export default function Search<T>({ search, setSearch, setPage, placeholder }: SearchProps<T>) {
  return (
    <TextField
      size="small"
      placeholder={placeholder || 'Search...'}
      value={search}
      onChange={(e) => { setSearch(e.target.value as T); setPage(0); }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>🔍</span>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flex: 1,
        minWidth: 200,
        '& .MuiOutlinedInput-root': {
          color: 'white',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.8)' },
          '&.Mui-focused fieldset': { borderColor: 'white' },
        },
        '& input::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 },
      }}
    />
  );
}
